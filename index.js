// let startingUrl = 'http://tovarik.com.ua/articles/kupit-chashku-na-podarok-parnju-/';
let startingUrl = 'http://tovarik.com.ua/articles/kupiti-patriotichnu-chashku-na-den-kozaka-/';
const parser = require('./app/parser');
const initializeDbConnection = require('./app/database').initializeDbConnection;
const readDataFromDatabase = require('./app/database').readDataFromDatabase;

initializeDbConnection(()=>{
    parser(startingUrl)
});

