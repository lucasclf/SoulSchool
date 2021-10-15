const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: String,
    enrollment: String,
    password: String,
    grade: []
})

module.exports = mongoose.model("Students", studentSchema);