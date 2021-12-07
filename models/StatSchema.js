const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const StatisticsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    average: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Stats", StatisticsSchema);