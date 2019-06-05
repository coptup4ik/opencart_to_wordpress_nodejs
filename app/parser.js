const arrowElement = '→';
const cheerio = require('cheerio');
const needle = require('needle');
const URL = require('url');
const appendDataToDatabase = require('./database').appendDataToDatabase;


function parser(website) {
    console.log('starting parser');

    return new Promise((resolve, reject) => {

        let parsingFunction =
            (website) => {
                needle.get(website, (err, res) => {
                    const $ = cheerio.load(res.body, {decodeEntities: false});
                    if (err) reject(err);

                    let linkToNextPage = $('.blog-next-prev').children().filter(function () {
                        return $(this).text().includes(arrowElement)
                    }).attr('href');

                    let data = {
                        seoURL: URL.parse(website).pathname.split('/')[2],
                        title: $('.marginbottom5').text(),
                        dateAdd: $('.blog-data-record').text(),
                        viewsCount: $('.blog-viewed-record').text().replace(/[^0-9]/g,''),
                        content: $('.blog-record-description').html(),
                        metaDescription: $('meta[name=description]').attr("content") || '',
                        metaKeywords: $('meta[name=keywords]').attr("content")
                    };

                    appendDataToDatabase(data, () => {
                        console.log('One link appended ' + website);
                        if (linkToNextPage) {
                            parsingFunction(encodeURI(linkToNextPage))
                        } else {
                            console.log('Process is finished');
                            resolve('Parsing finished, initializing wordpress action')
                        }
                    })
                })
            };
        parsingFunction(website)
    })


}


module.exports = parser;