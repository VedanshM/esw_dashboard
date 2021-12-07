const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const StatisticsSchema = new Schema({
    count: {
        type: Number,
        required: true,
    },
    average: {
        type: Number,
        required: true
    },
    updated_at: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("Stats", StatisticsSchema);