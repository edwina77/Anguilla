/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Lead = require('../models/lexus').Lead;
var Contestant = require('../models/lexus').Contestant;

exports.createLead = function(req, res) {
    var userInfo = req.body;


    var lead = new Lead({
        email: userInfo.email,
        name: userInfo.name,
        zipcode: userInfo.zipcode,
        phone: userInfo.phone,
        dealerChoice: userInfo.dChoice
    });

    lead.save(function(err, ob) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(ob);
            res.send('it was saved');
        }
    });
}

exports.createContestant = function(req, res) {
    var userInfo = req.body;
    var user = new Contestant({
        email: userInfo.email,
        fName: userInfo.fName,
        lName: userInfo.lName,
        carInterested: userInfo.carInterested,
        zipcode: userInfo.zipcode,
        phone: userInfo.phone,
        contactReq: userInfo.contactReq,
        age: userInfo.age
    });

    user.save(function(err, ob) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(ob);
        }
        console.log('it was saved');
        res.send('it was saved');
    });

}
exports.getContestants = function(req, res) {
    Contestant.find({}, function(err, allOfThem) {
        if (err) {
            console.log("can't get list");
            res.send('durf');
        }
        else {
            console.log(allOfThem);
            res.send(allOfThem);
        }

    });

}