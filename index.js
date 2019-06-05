// let startingUrl = 'http://tovarik.com.ua/articles/kupit-chashku-na-podarok-parnju-/';
let startingUrl = 'http://tovarik.com.ua/articles/kupiti-patriotichnu-chashku-na-den-kozaka-/';
const parser = require('./app/parser');
const initializeDbConnection = require('./app/database').initializeDbConnection;
const readDataFromDatabase = require('./app/database').readDataFromDatabase;
const closeConnection = require('./app/database').closeConnection;
const processDatabase = require('./app/createPostsInWordpress');

initializeDbConnection(() => {
    parser(startingUrl)
        .then((status) => {
            console.log(status)
            return readDataFromDatabase()
        })
        .then((data) => {
            return processDatabase(data)
        })
        .then(() => {
            closeConnection()
        })
});

