const express = require("express")
const router = express.Router()
const tripStart = require("./trip_start/trip_start")

router.get("/trip_start", async (req,res)=>{
    const mongo_trip_start = await tripStart.find()
    res.send(mongo_trip_start)
})
router.post("/trip_start", async (req,res)=>{
    const post = new tripStart({
        start_address: req.body.start_address,
        start_locationId: req.body.start_locationId,
        end_address: req.body.end_address,
        end_locationId: req.body.end_locationId
    })
    await post.save()
    res.send.post
})
module.exports = router
