const databaseHandler = require('../db')

module.exports = async (sessionId,username) => {
    try {
        const login = await databaseHandler('checkLogin',[sessionId,username]);
        return login   
    } catch (error) {
        console.log(error)
    }
}