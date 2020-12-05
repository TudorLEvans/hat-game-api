const databaseHandler = require('../lib/db')
const {sessionGenerator} = require('../lib/common')
const eventEngine = require('./events')

module.exports = (io) => {

    io.on('connection', (socket) => {

        socket.on('join room', async (joiner) => {
            await databaseHandler('updatePlayerStatus',[joiner.sessionId,joiner.userId])
            const players = await databaseHandler('getPlayersInSession',[joiner.sessionId])
            console.log(players)
            socket.join(joiner.sessionId) 
            socket.to(joiner.sessionId).emit('update players',{players})
        })

        eventEngine(socket)
    });
}
