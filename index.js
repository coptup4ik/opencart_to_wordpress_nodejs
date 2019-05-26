const needle = require('needle');
const fs = require('fs');
const cheerio = require('cheerio');
const URL =  require('url');
let url = 'http://tovarik.com.ua/articles/kupiti-chashku-na-podarunok-sinovi/';
const wordpress = require('wordpress');
const WPAPI = require( 'wpapi' );
const wp = new WPAPI(
    {
        endpoint: 'http://newtovarik.com.ua/wp-json/',
        username: 'admin',
        password: 'admin',
        auth:true
    });

needle.get('http://tovarik.com.ua/admin/index.php?route=catalog/record/update&token=9dd911da690d128e7bed2615c459d860&record_id=900',(err,res)=>{
    console.log(res.body)
})

//
// const client = wordpress.createClient({
//     url: 'http://newtovarik.com.ua/',
//     username:'admin',
//     password:'admin'
// })


// 'blog-record-description'


//'→'

//
// wp.categories().then(function (data) {
//     let item = data.find(function (elem) {
//         return  elem.name === 'articles'
//     }).id
//     parser('http://tovarik.com.ua/articles/kupiti-podarunok-pohresnikam-2/', item);
// })
// function parser(website,categoryId){
//     needle.get(website,(err,res)=>{
//         const $ = cheerio.load(res.body, {decodeEntities: false});
//         if (err)  throw err;
//
//         let linkElem = $('.blog-next-prev').children().filter(function () {
//             return $(this).text().includes('→')
//         });
//
//         if (linkElem.html()){
//
//             // let data = `${linkElem.html()}\n${URL.parse(encodeURI(linkElem.attr('href').toString()))
//             //     .pathname.split('/')[2]}\n\n`
//             //
//             // fs.appendFile('./listOfLinks.txt',data ,function () {
//             //     console.log('One link appended '+ linkElem.attr('href').toString())
//             //     parser(encodeURI(
//             //         linkElem.attr('href').toString()))
//             // })
//             //
//             wp.posts().create({
//                 title: $('.marginbottom5').text(),
//                 content: $('.blog-record-description').html(),
//                 slug: URL.parse(website).pathname.split('/')[2],
//                 status: 'publish',
//                 categories: categoryId
//             }).then(function( response ) {
//                 console.log('One post added')
//                 parser(encodeURI(linkElem.attr('href').toString()),categoryId)
//             }).catch(function (e) {
//                 throw e
//             });
//
//             // console.log(URL.parse((linkElem.attr('href').toString())).pathname.split('/')[2])
//
//         }else {
//             console.log('Process is finished')
//         }
//     })
// }

// parser(url);



