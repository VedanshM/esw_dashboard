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
        console.log(cin_array)
        // let string = "";
        let arr = [];
        // let arr2 = [];

        let cur_theta = 0;
        let tmp = cin_array[cin_array.length - 1]['con'].split(',')
        console.log(tmp);
        cur_theta = tmp[0].split(':')[2]

        cin_array.reverse()

        for (let i in cin_array) {
            let element = cin_array[i];
            let con_data = element["con"];
            let point = con_data.split(',');
            let tmp_arr = []
            let flag = false
            for (let x in point) {
                if (point[x]!="") {
                    let e = point[x].split(':');
                    if (e[2] != cur_theta) {
                        flag = true
                        break
                    }
                    tmp_arr.push(e);
                }
            }
            console.log('hi')
            if (flag)
                break
            tmp_arr.reverse()
            arr = arr.concat(tmp_arr)
        }
        arr.reverse()
        arr = arr.map(el => el.map(Number))
        // elements in arr: time gap, current angle, 
        //                  target angle
        arr.sort((a, b) => a[0] - b[0]);
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


    request(req_opt, (error, response, body) => {
        if (error) {
            console.log(error)
            throw new Error(error);
        }
        res.status(201).send("ok")
    });

});

module.exports = router;
