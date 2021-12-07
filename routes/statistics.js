const express = require("express");
const router = express.Router();
const Stats = require("../models/StatSchema");

// Post request
// Saving Stat
router.post('/SaveStat', (req, res) => {
    let newStat = new Stats();
    
    // Uncomment this if count id using current docs in Stats
    // Stats.count({}, function( err, count){
    //     // console.log( "Number of Docs:", count );
    //     newStat.count = count+1
    // })

    newStat.count = req.body.count + 1
    newState.average = req.body.average
    newState.updated_at = new Date();

    newState.save(function (err, saved) {
        try {
            if (err) throw err.errmsg;

            res.status(200).json({
                success: true,
                message: "Successfully registered",
            })
        }
        catch (e) {
            res.status(500).json({
                success: false,
                message: "Something has gone wrong"
            })
        }
    })

});

// Get request
// Get all Stats
router.get('getStats', (req, res) => {
    Stats.find(function (err, stats) {
        if (err) {
            console.log(err);
        } else {
            res.json(stats);
        }
    })
});


module.exports = router;