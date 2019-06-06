const fs = require('fs');
const path = require('path');
const scriptFile = path.normalize('D:\\FILES\\razer\\OSPanel\\domains\\newtovarik.com.ua\\autopost.php')
const needle = require('needle');


async function processDatabase(array) {
    for (const item of array) {
        await createPostsInWordpress(item);
    }
    // return new Promise(resolve => resolve('added'))
}


async function createPostsInWordpress(data) {
    console.log('creating one post')
    let keywords = data.metaKeywords.split(', ').map((item, i, arr) => {
        return arr[i] = `'${item}'`
    }).join(',');


    let phpScript = `
                        <?php
                        require(dirname(__FILE__) . '/wp-load.php');
                        global $user_ID;
                        $new_post = array(
                        'post_title' => '${data.title}',
                        'post_content' => '${data.content}' ,
                        'post_status' => 'publish',
                        'post_date' => date('${data.dateAdd}'),
                        'post_author' => $user_ID,
                        'post_type' => 'post',
                        'post_category' => array('1'),
                        'tags_input'     => array(${keywords}),
                        'post_name'      => '${data.seoURL}',
                        'meta_input'     => array( '_yoast_wpseo_metadesc'=>'${data.metaDescription}','_yoast_wpseo_focuskw'=>'${data.metaKeywords}'  )                           
                        );
                        $post_id = wp_insert_post($new_post);
                        ?>
                        `;

    fs.writeFileSync(scriptFile, '', (err) => {
        if (err) return err;
    });

    fs.writeFileSync(scriptFile, phpScript, (err) => {
        if (err) return err;
    });


    await needle('get', 'http://newtovarik.com.ua/autopost.php')
    console.log('One post was added to Wordpress')
}

module.exports = processDatabase;