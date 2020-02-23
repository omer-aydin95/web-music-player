const {Router} = require("express");
const audioDAO = require("../dao/AudioDAO");

const audioController = Router();

audioController.get(
    "/getAll",
    (req, res) => {
        audioDAO.getAllAudios(
            (docs) => {
                res.send(docs);
            }
        );
    }
);

module.exports = audioController;
