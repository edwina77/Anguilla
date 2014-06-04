/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var mongoose = require('mongoose');

var biolage = mongoose.Schema({
    email: String,
    dateEntered: {type: Date, default: Date.now},
    designer: String,
    first: String,
    last: String
    
});



exports.biolage = mongoose.model('newBiolage', biolage);