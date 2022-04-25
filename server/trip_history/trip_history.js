const mongoose = require("mongoose")

const schema = mongoose.Schema({
    trip_start: String,
    trip_end: String,
    duration: Number,
    date: String
})

module.exports = mongoose.model("trip_history", schema)