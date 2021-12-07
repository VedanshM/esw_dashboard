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
    },
    lastUpdate: {
        type: String,
        required: true,
        default: "null"
    }
});

module.exports = mongoose.model("Stats", StatisticsSchema);
