module.exports = (server) => {
    server.use(
        function(req,res,next) {
            console.log(`{Found ${req.method} request: - - ${req.url} - - , time: ${Date()}}`)
            next()
        }
    )
}