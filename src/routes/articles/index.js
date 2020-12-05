const {
    databaseQuery,
} = require('./articles_handler')

module.exports = (server) => {
    server.post('/database/:query',databaseQuery)
}