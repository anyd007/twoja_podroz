const mongoose = require("mongoose")

const schema = mongoose.Schema({
    start_address: Object,
    start_locationId: Object,
    end_address: Object,
    end_locationId: Object
})

module.exports = mongoose.model("trip_start", schema)