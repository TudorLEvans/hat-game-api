const jwt = require('jsonwebtoken')
const { secret } = require('../../../config/local.js')

module.exports = (req,res,next) => {
    console.log('LOGIN VERIFY')
    try {
        const token = req.header('Authorisation');
        if (!token) {
            res.status(403).send('No credentials provided')
        } else {
            const session = jwt.verify(token,secret)
            if (session.role !== 'admin') {
                res.status(403).send('You do not have permission to access this route')
            }
            res.locals.userId = session.userId;
            res.locals.role = session.role;
        }
    next();
    } catch (error) {
        console.log(error)
        res.status(403).send('No valid credentials provided')
    }
}