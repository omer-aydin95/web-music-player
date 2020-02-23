const express = require("express");
const bodyParser = require("body-parser");
const audioController = require("./controller/AudioController");
const playListController = require("./controller/PlayListController");
const audioMiddleware = require("./middleware/AudioMiddleware");
const playListMiddleware = require("./middleware/PlayListMiddleware");

const APP = express();
const PORT = 5991;

// Middleware
APP.use(bodyParser.urlencoded({ extended: false }));
APP.use(bodyParser.json());
APP.use("/audios", audioMiddleware);
APP.use("/play-lists", playListMiddleware);

// Route
APP.use("/audios", audioController);
APP.use("/play-lists", playListController);

APP.listen(PORT, () => console.log(`The app have started and is listening the port: ${PORT}`));
