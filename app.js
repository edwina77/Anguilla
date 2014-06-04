var express = require('express');
var mongoose = require('mongoose');
var app = express();

var port = process.env.PORT || 5000;

app.listen(port, function() {
    console.log("Node app is running at localhost:" + port);
});

var Vacation = require('./server/controller/vacation');

app.use(express.bodyParser({keepExtensions: true, uploadDir: '/selfies', limit: '50mb'}));
app.use(express.static(__dirname + '/public'));

app.all('*', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});


var connectionString = "mongodb://admin:admin@ds043338.mongolab.com:43338/questapp";
mongoose.connect(connectionString);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log('hey we are connected');

});

app.post('/vacation/create', Vacation.createContestant);
app.get('/vacation/getlist', Vacation.getContestants); 

