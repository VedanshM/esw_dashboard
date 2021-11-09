const express = require("express");
const router = express.Router();
const request = require("request");


const req_options = {
    method: 'GET',
    url: process.env.OM2M_BASE + '/queue_data',
    qs: { rcn: '4' },
    headers: {
        'accept': 'application/json',
        'x-m2m-origin': process.env.OM2M_SECRET
    }
};

router.get("/", (req, res) => {
    request(req_options, (error, response, body) => {
        if (error) {
            console.log(error)
            throw new Error(error);
        }
        res.json(body);
    });

});

module.exports = router;
