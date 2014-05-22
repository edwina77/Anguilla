var express = require('express');
var mongoose = require('mongoose');
var app = express();

var port =process.env.PORT || 5000;

app.listen(port, function() {
  console.log("Node app is running at localhost:" +port);
});

console.log('Listening on port 8080');
var SocialFeeds = require('./server/controller/social');
var Lexus = require('./server/controller/lexus');
var Biolage = require('./server/controller/biolage');
var Loreal = require('./server/controller/loreal');

var connectionString = 'mongodb://pbrain19:321654987p@ds051368.mongolab.com:51368/lexusemails';
mongoose.connect(connectionString);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log('hey we are connected');

});
 
var fs = require('fs');
var AWS = require('aws-sdk');
AWS.config.loadFromPath('awsconfig.json');

var s3bucket = new AWS.S3({params: {Bucket: 'metroselfies'}});

app.use(express.bodyParser({keepExtensions: true, uploadDir: '/selfies', limit: '50mb'}));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
});

app.get('/facebookfeeds', SocialFeeds.getfacebook);
app.get('/twitterfeeds', SocialFeeds.getTwitter);
app.get('/instagramfeeds', SocialFeeds.getInstagram);



app.post('/leads/contactInfo', Lexus.createLead);
app.post('/contestants/signup', Lexus.createContestant);
app.get('/contestants/getList', Lexus.getContestants);


app.post('/biolage/create', Biolage.createContestant);
app.get('/biolage/getlist', Biolage.getContestants);
app.post('/biolage/deleteitem', Biolage.deleteContestant);

app.post('/loreal/create',Loreal.createContestant);
app.get('/loreal/getlist',Loreal.getContestants);
app.post('/loreal/deleteitem',Loreal.deleteContestant);


app.post('/metroselfies/SelfieS3', function(req, res) {
    var bods = req.body;
    var img = bods.dataurl;
    var data = img.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');
    var imageName = Math.floor((Math.random() * 1000000000000000) + 10000000);

    s3bucket.createBucket(function() {

        var selfie = {Key: 'selfie/' + imageName + '.png', Body: buf, ACL: 'public-read', ContentType: "image/png"};
        s3bucket.putObject(selfie, function(err, data) {
            if (err) {
                console.log("Error uploading data: ", err);
                res.send(err);
            } else {
                res.send('https://s3.amazonaws.com/metroselfies/selfie/' + imageName + '.png');
            }
        });
    });


});