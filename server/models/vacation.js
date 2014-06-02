


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var vacation = Schema({
    qs : [Schema.Types.Mixed]
});



exports.vacation = mongoose.model('vacation', vacation);