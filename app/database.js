const MongoClient = require('mongodb').MongoClient;
const db = require('../config/db');

let database = {};
let collection = {};
let dbClient = {};

function initializeDbConnection(callback) {
    MongoClient.connect(db.url, {useNewUrlParser: true}, (err, client) => {
        if (err)throw err;

        console.log('We are connected!!');
        database = client.db(db.name);
        collection = database.collection(db.collection);
        dbClient = client;
        callback()
    });
}

function appendDataToDatabase(data,callback) {
    console.log('appending data');
    collection.insertOne(data, (err, result) => {
            if (err) {
                return console.log(err)
            }
            callback()
        }
    )
}

function closeConnection(){
    dbClient.close(()=>{
        console.log('Connection closed')

    })
}



function readDataFromDatabase() {
    console.log('reading data');
    collection.find().toArray((err, result) => {
            if (err) {
                return console.log(err)
            }
            return result
        }
    )
}



module.exports = {appendDataToDatabase,initializeDbConnection,closeConnection,readDataFromDatabase};
