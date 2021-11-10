const express = require("express");
const router = express.Router();
const request = require("request");

const sensor_getAll_opt = {
    method: 'GET',
    url: process.env.OM2M_BASE + '/sensor_data',
    qs: { rcn: '4' },
    headers: {
        'accept': 'application/json',
        'x-m2m-origin': process.env.OM2M_SECRET
    }
};

const queueGet_opt = {
    method: 'POST',
    url: process.env.OM2M_BASE + '/queue_data',
    body: "",
    headers: {
        'Content-Type': 'application/json;ty=4',
        'x-m2m-origin': process.env.OM2M_SECRET
    }
};

// GET request for sensor data
router.get("/getData", (req, res) => {
    request(sensor_getAll_opt, (error, response, body) => {
        if (error) {
            console.log(error)
            throw new Error(error);
        }

        let content = JSON.parse(body);
        let cin_array = content["m2m:cnt"]["m2m:cin"];
        // let string = "";
        let arr = [];
        for (let i in cin_array) {
            element = cin_array[i]
            let con_data = element["con"];
            let point = con_data.split(',');
            for (let x in point) {
                let e = x.split(':')
                e.push(element["ct"]);
                arr.push(e)
            }
        }

        // elements in arr: time gap, current angle, 
        //                  target angle, actual time
        arr.sort((a, b) => a[3] > b[3]);
        console.log(arr)
        let cur_theta = arr[arr.length - 1][2];
        arr = arr.filter(function (e) {
            return e[2] == cur_theta;
        });
        arr = arr.map(function (val) {
            return val.slice(0, -1);
        });
        res.json(arr);
    });

});

// POST request for queue data
router.post("/sendData", (req, res) => {
    const req_opt = {
        ...queueGet_opt,
        body: JSON.stringify({
            "m2m:cin": {
                con: req.body.angle
            }
        })
    }

    console.log(req_opt)

    request(req_opt, (error, response, body) => {
        if (error) {
            console.log(error)
            throw new Error(error);
        }
    });

});

module.exports = router;
