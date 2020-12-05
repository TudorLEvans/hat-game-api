module.exports = (socket) => {
    require('./sessions')(socket)
    require('./turns')(socket)
    require('./players')(socket)
    require('./rounds')(socket)
}