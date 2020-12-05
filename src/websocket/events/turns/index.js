const databaseHandler = require('../../../lib/db')

module.exports = (socket) => {
    socket.on('start turn', (sessionId,output) => {
        socket.in(sessionId).emit('turn started', () => {
            setTimeout((socket) => {
                databaseHandler("updateTurnRecord",[output.turnId,sessionId])
                socket.in(sessionId).emit('turn ended')
            }, 30000)
        })
    })

    socket.on('next turn', async (sessionId) => {
        const round = await databaseHandler("getSessionInfo", [sessionId])
        const roundComplete = await databaseHandler("checkRoundComplete",[sessionId])
        if (roundComplete[0]) {
            await databaseHandler("updateRound",[round.round+1,sessionId])
            socket.to(sessionId).emit('new round', {...round,...{round:(round.round+1)}})
        } else {
            const player = await databaseHandler('getWhoseGoItIs',[sessionId])
            await databaseHandler("updateWhoseGoItIs",[player.userId,sessionId,round.currentTeam])
            const item = await databaseHandler("getItemFromHat",[sessionId])
            await databaseHandler("createTurnRecord",[item.hatId,player.userId,round.round,sessionId,round.currentTeam])
        }
    })
}