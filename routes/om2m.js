const express = require("express");
const router = express.Router();
const request = require("request");
const { hash_and_encrypt, check_and_decrypt } = require("../utils/crypt");


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
        // console.log(cin_array)
        // let string = "";
        let arr = [];
        // let arr2 = [];
        // console.log(cin_array[cin_array.length - 1]['con'])

        let last_label = check_and_decrypt(cin_array[cin_array.length - 1]['con'], process.env.AES_KEY).split(',')[0].split(':')
        if (last_label == null) {
            res.send([])
            return
        }

        let cur_target_id = last_label[0]
        let cur_target = last_label[1]

        cin_array.reverse()

        for (let i in cin_array) {
            let element = cin_array[i];
            let con_data = check_and_decrypt(element["con"], process.env.AES_KEY);
            let point = con_data.split(',')
            let target_id = point[0].split(':')[0]

            if (target_id != cur_target_id)
                break

            let tmp_arr = []
            for (let x in point) {
                if (point[x] != "" && x > 0) {
                    let e = point[x].split(':');
                    e.push(cur_target);
                    tmp_arr.push(e);
                }
            }
            tmp_arr.reverse()
            arr = arr.concat(tmp_arr)
        }
        arr.reverse()
        arr = arr.map(el => el.map(Number))
        // elements in arr: time gap, current angle, target angle
        arr.sort((a, b) => a[0] - b[0]);
        res.json(arr);
    });

});

// POST request for queue data
router.post("/sendData", (req, res) => {
    const queue_data = req.body.angle.toString() + ":" + req.body.k_p.toString() + ":"  + req.body.k_i.toString() + ":" + req.body.k_d.toString();
    const req_opt = {
        ...queueGet_opt,
        body: JSON.stringify({
            "m2m:cin": {
                con: hash_and_encrypt(queue_data, process.env.AES_KEY)
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
