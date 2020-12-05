const jwt = require('jsonwebtoken')
const { secret } = require('../../../config/local.js')
const databaseHandler = require('../../lib/db')
const crypto = require('crypto')

const login = async (req,res,next) => {
    try {
        const { params } = req.body;
        const sessionId = [params[0]]
        const result = await databaseHandler('checkSession',sessionId)
        if (!result) next(res.send(403,'session invalid'))
        const userExists = await databaseHandler('checkLogin',params);
        let login;
        if (!userExists) {
            await databaseHandler('createLogin',params)
            login = await databaseHandler('checkLogin',params)
        } else login = userExists
        console.log('here is login',login)
            const token = await jwt.sign(login, secret, {
                expiresIn: '8h'
            });
        console.log('here is the login',login)
        next(res.send(200, { token, userId: login.userId, sessionId: login.sessionId,username:login.username}));
    } catch (error) {
        console.log(error);
        res.status(500);
        next();
    }
}

const createRoom = async (req,res,next) => {
    try {
        const { params } = req.body;
        const sessionId = [params[0]]
        const output = await Promise.all([
            databaseHandler('createSession',sessionId),
            databaseHandler('createLogin',params)
        ])
        console.log('output here', output)
        if (output[0] && output[1]) {
            const login = await databaseHandler('checkLogin',params)
            console.log('here is login',login)
            const token = await jwt.sign(login, secret, {
                expiresIn: '8h'
            });
            console.log('here is the login',login)
            next(res.send(200, { token, userId: login.userId, sessionId: login.sessionId, username:login.username}));
        } else next(res.send(403,'login not valid - the session name or username may already be in use'));
        next();
    } catch (error) {
        console.log(error);
        res.status(500);
        next();
    }
}

module.exports = {
    login,
    createRoom,
}