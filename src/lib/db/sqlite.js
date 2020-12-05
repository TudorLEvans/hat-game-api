const sqlite3 = require('sqlite3').verbose()
const md5 = require('md5')
const functions = require('./functions.json')
const dbsource = './src/lib/db/hatgame'

const db = new sqlite3.Database(dbsource, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    } 
    console.log('Connected to SQLite DB : ', dbsource)
});

const resultFactory = (rows,type) => {
    switch (type) {
        case 'rows':
            return rows
            break;
        case 'singleRow':
            return rows[0]
            break;
        case 'success':
            if (rows === 0) {
                return false
            }
            return true
            break;
        default:
            return 'statement return type invalid'
    }
}

const dbQuery = function(sql,input, method, callback){
    let result = [];
    console.log(sql,input,method)
    switch (method) {
        case 'each':
        case 'get':
            db.each(sql,input, function(err,row) {
                if (err) {
                    callback(err)
                }
                result.push(row);
            }, function(){
                callback(result); 
            });
        break;
        case 'run':
            db.run(sql,input, function(err) {
                if (err) {
                    callback(error)
                }
            }, function(){
                console.log(this.changes)
                callback(this.changes ? this.changes : 0); 
            });
        break;
    }
}

module.exports = async (functionName, params) => {
    const { query, type, method, conversion } = functions[functionName]
    console.log(params)
    const output = conversion ? conversion.map(item => params[item]) : params
    console.log(output)
    return new Promise(function (resolve,reject) {
        dbQuery(query,output, method, function(data){
            resolve(resultFactory(data,type))
        });
    })
};