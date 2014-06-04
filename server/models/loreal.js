


var mongoose = require('mongoose');

var loreal = mongoose.Schema({
    email: String,
    dateEntered: {type: Date, default: Date.now},
   
    first: String,
    last: String,
     answers:[String],
        results:[String],
        urls:[String],
    
    optIn:Boolean
});



exports.loreal = mongoose.model('newLoreal', loreal);