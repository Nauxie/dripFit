let mongoose = require('mongoose');
let shortid = require('shortid');

let articleSchema = new mongoose.Schema({
    _id: {type: String, required: true, default: shortid.generate},
    articleClassification: {type: String, required: true},
    tags: {type: [String], required: true},
    color: {type: String, required: true},
    colorGoesWith: {type: [String], required: true},
    created: {type: Date, required: true, default: Date.now},
    type: {type: String, required: true},
    // attachment_path: {type: String, required: false},
    // attachment_name: {type: String, required: false}

});

let Article = new mongoose.model('Article', articleSchema);

module.exports = Article;