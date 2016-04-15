// The search model

var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var searchSchema = new Schema({
    urlId: ObjectId,
    term: {type: String},
    when: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Search', searchSchema);