const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    summary: String,
    content: String,
    cover: String,
},{
    timestamps: true
});

const PostModel = mongoose.model('Posts', PostSchema);

module.exports = PostModel;