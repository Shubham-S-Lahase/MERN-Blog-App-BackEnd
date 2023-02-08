const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    summary: String,
    content: String,
    cover: String,
    author:{type: Schema.Types.ObjectId, ref:'Users'},
},{
    timestamps: true
});

const PostModel = mongoose.model('Posts', PostSchema);

module.exports = PostModel;