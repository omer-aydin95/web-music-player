const express = require("express");
const bodyParser = require("body-parser");
const playListMiddleware = require("./middleware/PlayListMiddleware");
const playListController = require("./controller/PlayListController");

const APP = express();
const PORT = 5991;

// Middleware
APP.use(bodyParser.urlencoded({ extended: false }));
APP.use(bodyParser.json());
APP.use("/play-lists", playListMiddleware);

// Route
APP.use("/play-lists", playListController);

APP.listen(PORT, () => console.log(`The app have started and is listening the port: ${PORT}`));
