<?php
/**
 * Writes new posts into wordpress programatically
 *
 * @package WordPress
 */

/** Make sure that the WordPress bootstrap has run before continuing. */
require(dirname(__FILE__) . '/wp-load.php');

global $user_ID;
$new_post = array(
'post_title' => 'Replaced Post',
'post_content' => 'Lorem ipsum dolor sit amet...',
'post_status' => 'publish',
'post_date' => date('Y-m-d H:i:s'),
'post_author' => $user_ID,
'post_type' => 'post',
'post_category' => array('articles_test'),
'tags_input'     => array( 'first_tag', 'second_tag','third_tag'),
'post_name'      => 'testovui_slug',
'meta_input'     => array( '_yoast_wpseo_metadesc'=>'SEO Meta Descr','_yoast_wpseo_focuskw'=>'keyword1 keyword2'  )                           
);
$post_id = wp_insert_post($new_post);
?>