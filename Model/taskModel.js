var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new mongoose.Schema({
    'taskName': String,
    'taskStatus': String,
    'addedOn': Date,
    'closedOn': Date
});

module.exports = mongoose.model('task', taskSchema);