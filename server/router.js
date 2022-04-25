const express = require("express")
const router = express.Router()
const tripHistory = require("./trip_history/trip_history")

router.get("/trip_history", async (req,res)=>{
    const mongo_trip_history = await tripHistory.find()
    res.send(mongo_trip_history)
})
router.post("/trip_history", async (req,res)=>{
    const post = new tripHistory({
        trip_start: req.body.trip_start,
        trip_end: req.body.trip_end,
        duration: req.body.duration,
        date: req.body.date
    })
})

module.exports = router