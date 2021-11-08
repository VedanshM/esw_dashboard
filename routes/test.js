const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("data from backend")
});

module.exports = router;
