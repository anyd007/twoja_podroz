const mongoose = require("mongoose")

const schema = mongoose.Schema({
    start_address: Object,
    start_locationId: Object
})

module.exports = mongoose.model("trip_start", schema)