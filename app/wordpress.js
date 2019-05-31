//connect to db
//receive data
// create post
//send post to wordpress
// const wordpress = require('wordpress')
//
// const WPAPI = require('wpapi');
// const wp = new WPAPI(
//     {
//         endpoint: 'http://newtovarik.com.ua/wp-json/',
//         username: 'admin',
//         password: 'admin',
//         auth: true
//     });
//
//
// wp.posts()
//     .create({
//         title: 'test title',
//         content: 'test content',
//         slug: 'test-slug',
//         status: 'publish',
//         categories: 7,
//         meta:{
//             custom_meta_key:'first meta'
//         }
//     })
//     .then(function (response) {
//         console.log('One post added')
//         console.log(response)
//     })
//     .catch(function (e) {
//         throw e
//     });
//

// const client = wordpress.createClient({
//     url: "http://newtovarik.com.ua/",
//     username: "admin",
//     password: "admin"
// });
//
// client.newPost({
//     title: "My Second Post",
//     content: "Publishing to WordPress from node.js sure is fun!",
//     status: "publish",
//     termNames: {
//         "category": ["articles"],
//         "post_tag": ["api", "fun", "js"],
//
//     },
//     meta: {
//         custom_meta_key: 'something'
//     }
// }, function( error, data ) {
//     console.log( data );
// });



const fs = require('fs')
const path = require('path')
const fileName = path.normalize('C:\\Users\\Pasha\\Downloads\\OSPanel\\domains\\newtovarik.com.ua\\autopost.php')

fs.readFile(fileName,"utf8",(err,data)=>{
    if (err) return console.log(err);
    let result = data.replace('My New Post','Replaced Post')
    fs.writeFile(fileName,result,'utf-8',err1 => console.log(err1))
});