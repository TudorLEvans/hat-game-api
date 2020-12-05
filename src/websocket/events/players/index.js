const databaseHandler = require('../../../lib/db')

module.exports = (socket) => {
    socket.on('players updated', async (input) => {
        console.log('players updated')
        const players = await databaseHandler('getPlayersInSession',[input.sessionId])
        console.log(players)
        socket.to(input.sessionId).emit('update players',{players:players})
    })

    socket.on('hat filled', async (sessionId) => {
        const players = await databaseHandler('getPlayersInSession',[sessionId])
        socket.to(sessionId).emit('players updated',{players:players})
    })

    socket.on('update scores', async (sessionId) => {
        const players = await databaseHandler('getPlayersInSession',[sessionId])
        socket.to(sessionId).emit('players updated',{players:players})
    })
}