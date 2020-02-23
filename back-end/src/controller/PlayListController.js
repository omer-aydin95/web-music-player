const {Router} = require("express");
const audioDAO = require("../dao/AudioDAO");
const playListDAO = require("../dao/PlayListDAO");
const PlayList = require("../model/PlayList");

const playListController = Router();

playListController.get(
    "/getAllLists",
    (req, res) => {
        playListDAO.getAllPlayLists(
            (playListDocs) => {
                if(playListDocs == null) {
                    playListDocs = [];
                }

                playLists = [new PlayList("all", "All"), ...playListDocs];

                playLists = playLists.map(
                    (playList) => {
                        return (
                            {
                                _id: playList._id,
                                listName: playList.listName
                            }
                        );
                    }
                )

                res.send(playLists);
            }
        );
    }
);

playListController.get(
    "/getList",
    (req, res) => {
        if(req.query.listID == "all") {
            audioDAO.getAllAudios(
                (audioDocs) => {
                    let playList = new PlayList("all", "All");

                    if(audioDocs != null && audioDocs.length > 0) {
                        playList.audios = audioDocs;
                    }

                    res.send(playList);
                }
            );
        } else {
            playListDAO.getPlayList(
                req.query.listID,
                (playListDoc) => {
                    if(playListDoc == null) {
                        res.send(null);

                        return;
                    }

                    let playList = new PlayList(playListDoc._id, playListDoc.listName);

                    audioDAO.getAudios(
                        playListDoc.audios,
                        (audioDocs) => {
                            if(audioDocs != null) {
                                playList.audios = audioDocs;
                            }

                            res.send(playList);
                        }
                    );
                }
            );
        }
    }
);

module.exports = playListController;
