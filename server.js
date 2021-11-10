require('dotenv').config()
const express = require("express");
const cors = require("cors");
const path = require("path")
const PORT = process.env.PORT || 5000;

const logger = require("./logger");
const testRouter = require("./routes/test");
const om2mRouter = require("./routes/om2m")

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);

// adding routes
app.use("/testapi", testRouter);
app.use("/api", om2mRouter);


// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});
