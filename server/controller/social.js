/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var async = require("async");
var Twit = require('twit');
var T = new Twit({
    consumer_key: 'V9QBGIq334Rtox6MQYMfw'
    , consumer_secret: 'd8ojac0aRGXA4PAQVkDrdh4zDbskyOZkEop4W8af8U'
    , access_token: '623317845-dNAdk88XrW1lfSNvjUPQH0yayGu3B2k9d98hPXkU'
    , access_token_secret: 'XTVOSszjEyTCJOCvQeIzweYhp66pwU5N97MG6aoykvnWo'
});
var ig = require('instagram').createClient('44291ab8d0ab429ca9671416a2a7f285', 'c61b87a543b94a06bcd4a4e592e13bb8');


var FB = require('fb');
FB.setAccessToken('282107651943872|93a7aace3ada6094da46db246b047c0a');

exports.getfacebook = function(req, res) {
    var results = [];
    var parsedData = req.query;
    function sendResults() {

        res.send(results);
    }
    function getEachHD(post, callback) {

        if (!post || !post.object_id) {
            results.push({
                message: post.message,
                datemade: new Date(post.created_time),
                provider: 'facebook'
            });
            callback();
        } else {
            FB.api(post.object_id, function(data) {
                if (!data || data.error) {

                    console.log('hey there it did not work');
                    callback();
                } else {

                    results.push({
                        message: data.name,
                        image: data.images[0].source,
                        datemade: new Date(data.created_time),
                        provider: 'facebook'
                    });
                    callback();
                }
            })
        }
    }

//gets all facebook feeds
    FB.api('/' + parsedData.screenName + '/feed', function(data) {
        if (!data || data.error) {

            res.send('hey there it did not work');
        } else {

            async.each(data.data, getEachHD, function(err) {
                sendResults();
            });

        }
        ;
    });

}


exports.getInstagram = function(req, res) {


    var results = [];
    var parsedData = req.query;
    function sendResults() {
        res.send(results);
    }

    function getShortPosts(data, callback) {
        if (!data) {

            callback();

        } else if (!data.caption) {

            callback();
        }
        else if (data.videos) {
            var datam = new Date(data.created_time * 1000)

            results.push({
                datemade: datam,
                message: data.caption.text,
                provider: 'Instagram',
                video: data.videos.standard_resolution.url
            });

            callback();
        } else if (data.images) {

            var datam = new Date(data.created_time * 1000)

            results.push({
                datemade: datam,
                message: data.caption.text,
                provider: 'Instagram',
                image: data.images.standard_resolution.url
            });

            callback();
        }
    }

    ig.tags.media(parsedData.screenName, function(medias, error) {
        if (error) {
            res.send(error);
        } else {
            async.each(medias, getShortPosts, sendResults);
        }

    });


}


exports.getTwitter = function(req, res) {
    var results = [];
    var parsedData = req.query;
    function sendResults() {
        res.send(results);
    }
    function getShortPosts(data, callback) {
        if (!data || !data.entities.media) {
            results.push({
                datemade: new Date(data.created_at),
                message: data.text,
                provider: 'twitter'

            });

            callback()

        } else {
            results.push({
                datemade: new Date(data.created_at),
                message: data.text,
                image: data.entities.media[0].media_url,
                provider: 'twitter'
            });
            callback()
        }
    }


    T.get('statuses/user_timeline', {screen_name: parsedData.screenName, count: 100}, function(err, reply) {
        if (err) {

            res.send(err);
        } else {
            async.each(reply, getShortPosts, sendResults);
        }
        ;

    })
}