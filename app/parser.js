const arrowElement = '←';
const cheerio = require('cheerio');
const needle = require('needle');
const URL = require('url');
const appendDataToDatabase = require('./database').appendDataToDatabase;
const closeConnection = require('./database').closeConnection;


function parser(website) {
    console.log('starting parser');
    needle.get(website, (err, res) => {
        const $ = cheerio.load(res.body, {decodeEntities: false});
        if (err) return console.log(err) ;

        let linkToNextPage = $('.blog-next-prev').children().filter(function () {
            return $(this).text().includes(arrowElement)
        }).attr('href');

        if (linkToNextPage) {
            let data = {
                seoURL: URL.parse(website).pathname.split('/')[2],
                title: $('.marginbottom5').text(),
                dateAdd: $('.blog-data-record').text(),
                viewsCount: $('.blog-viewed-record').text(),
                content: $('.blog-record-description').html(),
                metaDescription: $('meta[name=description]').attr("content") || '',
                metaKeywords: $('meta[name=keywords]').attr("content")
            }

            appendDataToDatabase(data, ()=>{
                console.log('One link appended ' + linkToNextPage);
                parser(encodeURI(linkToNextPage))
            })



        } else {
            console.log('Process is finished');
            closeConnection()
        }
    })
}


module.exports = parser;