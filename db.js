const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json');
const db = low(adapter);


// Set some defaults
db.defaults({ subscriptions: [], notifications: [] }).write()

module.exports = db;