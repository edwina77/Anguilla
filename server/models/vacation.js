


var mongoose = require('mongoose');

var vacation = mongoose.Schema({
    qs : []
});



exports.vacation = mongoose.model('vacation', vacation);