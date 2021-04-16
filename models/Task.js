const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    datetime: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    creator: {
        type: String,
        required: true
    }
})

module.exports = Task = mongoose.model('task', TaskSchema);