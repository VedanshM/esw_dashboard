require('dotenv').config()
const express = require("express");
const cors = require("cors");
const path = require("path")
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const PORT = process.env.PORT || 5000;


const usersRouter = require('./routes/users');

const logger = require("./logger");
const testRouter = require("./routes/test");
const om2mRouter = require("./routes/om2m")

mongoose.connect(process.env.MONGO_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	}
)
.then(() => {
	console.log("MongoDB is Connected");
})
.catch((error) => {
	console.log("MongoDB is not connected because of: " + error);
})


const app = express();

app.use(cors({credentials: true, origin: true}));
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);
app.use(cookieParser());

// adding routes
app.use("/testapi", testRouter);
app.use("/api", om2mRouter);
app.use("/user", usersRouter);


// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});
