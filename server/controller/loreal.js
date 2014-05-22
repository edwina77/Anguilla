/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Contestant = require('../models/loreal').loreal;


exports.createContestant = function(req, res) {

    var newContestant = new Contestant(req.body);
    newContestant.save(function(err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }

    });


};

exports.getContestants = function(req, res) {

    Contestant.find({}, function(err, data) {

        if (err) {

            res.send(err);
        } else {

            res.send(data);
        }

    });

};

exports.deleteContestant = function(req, res) {
    console.log(req.body);
    Contestant.remove(req.body, function(err, data) {
        if (err) {

            res.send(401, err);
        } else {

            res.send('it was deleted');
        }

    });


};




