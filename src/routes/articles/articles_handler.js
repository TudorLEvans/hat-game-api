const databaseHandler = require('../../lib/db')

const databaseQuery = async (req,res,next) => {
    try {
        const { query } = req.params;
        const { params } = req.body;
        const result = await databaseHandler(query,params)
        console.log(result)
        if (result.error) {
            res.status(result.status)
        } else {
            res.send(result).status(200);
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500);
        next();
    }
}
    
module.exports = {
    databaseQuery,
}