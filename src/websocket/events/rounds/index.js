const databaseHandler = require('../../../lib/db')

module.exports = (socket) => {
    socket.on('new round', (sessionId) => {
        setTimeout(()=> {
            socket.to(sessionId).emit('round started')
        }, 5000)
        setTimeout(()=> {
            socket.to(sessionId).emit('next turn')
        }, 7000)
    })
}