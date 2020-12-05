module.exports = (server) => {
    require('./articles')(server)
    require('./users')(server)
}