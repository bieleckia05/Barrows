module.exports = function() {

    var uuid = require('node-uuid');
    var mongoose = require('mongoose');
    var async = require('async');

    var sellingItem_Schema = mongoose.Schema({
        id: 'string',
        name: 'string',
        description: 'string',
        collectionTerms: 'string',
        totalTickets: 'number',
        remainingTickets: 'number',
        endDate: 'date',
        images: []
    });

    var sellingItem_Model = mongoose.model('sellingItem', sellingItem_Schema);
    var sellingItem_Instance = new sellingItem_Model() {
        description = 'Hellor'
    };

    mongoose.connect('mongodb://MongoLab-h:fK0zjgbvtOrmpq!hKcc8cgGG4!bnagmrfL8YSzaW70E-@ds035787.mongolab.com:35787/MongoLab-h');

    async.series([

    function(next) {
        sellingItem_Instance.save(function(err) {
            if (err) return next(err);
            next();
        })
    },

    function(next) {
        sellingItem_Model.find().exec(function(err, result) {
            if (err) return next(err);
            next();
        });
    }],

    function(err, result) {
        if (err) return console.log(err);
    });
}