/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongoose = require('mongoose');

var contestantSchema = mongoose.Schema({
    email: String,
    fName: String,
    lName: String,
    carInterested: [String],
    zipcode: String,
    contactReq: String,
    phone: String
});

var lead = mongoose.Schema({
    email: String,
    name: String,
    zipcode: String,
    phone: String,
    dealerChoice: String
});


contestantSchema.add({age: {type: String, default: "under 21"}});
contestantSchema.add({dateRegistered: {type: Date, default: Date.now}});
lead.add({dateRegistered: {type: Date, default: Date.now}});


exports.Lead = mongoose.model('Lead', lead);
exports.Contestant = mongoose.model('Contestant', contestantSchema);