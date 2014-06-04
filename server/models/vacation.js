


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vacation = new Schema({
    q1:String,
    q2:String,
    q3:String,
    q4:String,
    q5:String,
    q6:String,
    q7:String,
    q8:String,
    email :String,
    name :String
});



exports.vacation = mongoose.model('vacation', vacation);