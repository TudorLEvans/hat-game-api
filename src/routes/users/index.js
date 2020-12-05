const {
    login,
    createRoom
} = require('./user_handler')

module.exports = (server) => {
    server.post('/session/login',login)
    server.post('/session/create',createRoom)
}