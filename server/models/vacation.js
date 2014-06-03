


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var emailSchema = new Schema ({
    name : String,
    email : String
});
var vacation = new Schema({
    q1:String,
    q2:String,
    q3:String,
    q4:String,
    q5:String,
    q6:String,
    q7:String,
    q8:String,
    email : emailSchema
});



exports.vacation = mongoose.model('vacation', vacation);