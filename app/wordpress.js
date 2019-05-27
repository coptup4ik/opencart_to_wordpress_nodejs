const WPAPI = require( 'wpapi' );
const wp = new WPAPI(
    {
        endpoint: 'http://newtovarik.com.ua/wp-json/',
        username: 'admin',
        password: 'admin',
        auth:true
    });


// wp.posts().create({
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