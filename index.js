let startingUrl = 'http://tovarik.com.ua/articles/kupit-chashku-na-podarok-parnju-/';
const parser = require('./app/parser')
const initializeDbConnection = require('./app/database').initializeDbConnection;

initializeDbConnection(()=>{parser(startingUrl)});

