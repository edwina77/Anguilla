


var mongoose = require('mongoose');

var vacation = mongoose.Schema({
    q1: String,
    q2:String,
    q3:String,
    q4:String,
    q5:String,
    q6: String,
    q7:String,
    q8:String,
    q9:String,
    q10:String,
    q11:String
    
});



exports.vacation = mongoose.model('vacation', vacation);