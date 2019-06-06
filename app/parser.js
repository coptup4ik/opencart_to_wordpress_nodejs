const arrowElement = '→';
const cheerio = require('cheerio');
const needle = require('needle');
const URL = require('url');
const appendDataToDatabase = require('./database').appendDataToDatabase;

function parseDateToPhpString(string) {
    const monthValues = {
        '01': 'января',
        '02': 'февраля',
        '03': 'марта',
        '04': 'апреля',
        '05': 'мая',
        '06': 'июня',
        '07': 'июля',
        '08': 'августа',
        '09': 'сентября',
        '10': 'октября',
        '11': 'ноября',
        '12': 'декабря',
    };
    let array = string.split(' ');


    const getMonth = (obj, val) => {
        return Object.keys(obj).find(key => {
            return obj[key] === val
        })
    };


    let year = array[3];
    let month = getMonth(monthValues, array[2]);
    let day = array[1];
    let hours = array[5].split(':')[0];
    let minutes = array[5].split(':')[1];
    let seconds = array[5].split(':')[2];

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

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
                        dateAdd: parseDateToPhpString( $('.blog-data-record').text() ),
                        viewsCount: $('.blog-viewed-record').text().replace(/[^0-9]/g, ''),
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