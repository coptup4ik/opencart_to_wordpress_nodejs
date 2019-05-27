// let startingUrl = 'http://tovarik.com.ua/articles/chesna-robota-magazinu-tovarikcomua-zruchnij-tajmer-vidpravlennja-zamovlen-/';
let startingUrl = 'http://tovarik.com.ua/articles/scho-kupiti-na-podarunok-uchitelju-himiji-/';
const parser = require('./app/parser')
const initializeDbConnection = require('./app/database').initializeDbConnection;
initializeDbConnection(()=>{parser(startingUrl)});

