const express = require("express");
const audioController = require("./controller/AudioController");

const APP = express();
const PORT = 5991;

APP.use("/audios", audioController);

APP.listen(PORT, () => console.log(`The app have started and is listening the port: ${PORT}`));
