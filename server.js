const express = require("express");
const cors = require("cors");
const path = require("path")
const PORT = 4000;

const logger = require("./logger");
const testRouter = require("./routes/test");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);

// adding routes
app.use("/api", testRouter);


// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});
