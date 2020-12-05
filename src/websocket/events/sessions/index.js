const databaseHandler = require('../../../lib/db')

module.exports = (socket) => {
    socket.on('red score updated', async (sessionId) => {
        const round = await databaseHandler("getSessionInfo", [sessionId])
        console.log(round,sessionId)
        socket.to(sessionId).emit('update red score',round)
    })

    socket.on('blue score updated', async (sessionId) => {
        console.log(sessionId)
        const round = await databaseHandler("getSessionInfo", [sessionId])
        console.log(round,sessionId)
        socket.to(sessionId).emit('update blue score',round)
    })

    socket.on('start inputs', async (sessionId) => {        
        await databaseHandler("updateRound",[-1,sessionId])
        socket.to(sessionId).emit('inputs started')
    })

    socket.on('start game', async (sessionId) => {
        await databaseHandler("updateRound",[1,sessionId])
        socket.to(sessionId).emit('game started')
    })

    socket.on('send message', async (sessionId,message) => {
        console.log('sessionId for message is',sessionId)
        console.log('the message is',message)
        socket.to(sessionId).emit('receive message',message)
    })

}