const express = require("express");
const audioDAO = require("../dao/AudioDAO");

const audioController = express.Router();

audioController.get(
    "/getAudio", 
    (req, res) => {
        audioDAO.getAudio(parseInt(req.query.audioID), (doc) => {
            res.send(doc);
        });
    }
);

module.exports = audioController;
