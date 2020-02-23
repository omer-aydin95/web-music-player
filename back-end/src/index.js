const express = require("express");
const bodyParser = require("body-parser");
const audioController = require("./controller/AudioController");
const audioMiddleware = require("./middleware/AudioMiddleware");

const APP = express();
const PORT = 5991;

// Middleware
APP.use(bodyParser.urlencoded({ extended: false }));
APP.use(bodyParser.json());
APP.use("/audios", audioMiddleware);

// Route
APP.use("/audios", audioController);

APP.listen(PORT, () => console.log(`The app have started and is listening the port: ${PORT}`));
