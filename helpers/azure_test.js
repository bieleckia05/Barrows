var azure = require('azure');
var uuid = require('node-uuid');
var async = require('async');

module.exports = function() {

    //AZURE TESTING
    var tableName = 'items';
    var tableService = azure.createTableService('willmott', 'OSG3UCA61bdPdwBHDAJ88zaTg5cNANbF94gGL0QHAUsPdkt7zK6HMOm2Va6/ILh2lKbjxQPCLA91mko4BPA2ng==');
    
    var sellingItem = {
        PartitionKey: 'Partition1',
        RowKey: uuid(),
        Name: 'Hellor'
    };
    var query = azure.TableQuery.select().from(tableName).where('Name eq ?', 'Hellor');

    //use async to control execution flow

    async.series({
        createTable: function(next) {
            tableService.createTableIfNotExists(tableName, next);
        },
        add: function(next) {
            console.log('table exists');
            tableService.insertEntity(tableName, sellingItem, next);
        },
        query: function(next) {
            console.log('inserted entity');
            tableService.queryEntities(query, next);
        }
    },
    function(err, result) {
        console.log('query completed');
    });

}