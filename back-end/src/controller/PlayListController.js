const {Router} = require("express");
const audioDAO = require("../dao/AudioDAO");
const playListDAO = require("../dao/PlayListDAO");
const PlayList = require("../model/PlayList");
const responseConstants = require("../constant/ResponseConstants");
const dbOperationConstants = require("../constant/DBOperationConstants");

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

playListController.post(
    "/saveList",
    (req, res) => {
        playListDAO.savePlayList(
            {listName: req.body.listName, audios: []},
            (insertedId) => {
                if(insertedId == null) {
                    res.status(500);
                    res.send({msg: "Internal server error!", status: responseConstants.FAIL});

                    return;
                }

                let playList = new PlayList(insertedId, req.body.listName);

                res.send({playList: playList, msg: "Play list have been saved.", status: responseConstants.SUCCESS});
            }
        );
    }
);

playListController.post(
    "/updateList",
    (req, res) => {
        playListDAO.getPlayList(
            req.body.listID,
            (playList) => {
                if(playList == null) {
                    res.status(500);
                    res.send({msg: "Play list not found!", status: responseConstants.FAIL});

                    return;
                }

                playList.audios.push(req.body.audioID);

                playListDAO.updatePlayList(
                    playList,
                    (dbOpRes) => {
                        if(dbOpRes != dbOperationConstants.EXECUTION_SUCCESS) {
                            res.status(500);
                            res.send({msg: "Play list couldn't updated!", status: responseConstants.FAIL});
                        } else {
                            res.send({msg: "Play list updated.", status: responseConstants.SUCCESS});
                        }
                    }
                );
            }
        );
    }
);

module.exports = playListController;
