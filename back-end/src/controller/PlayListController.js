const {Router} = require("express");
const audioDAO = require("../dao/AudioDAO");
const playListDAO = require("../dao/PlayListDAO");
const PlayList = require("../model/PlayList");
const responseConstants = require("../constant/ResponseConstants");
const dbOperationConstants = require("../constant/DBOperationConstants");

const playListController = Router();

playListController.get(
    "/",
    (req, res) => {
        if(!req.query.listID || req.query.listID == "") {
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
    
                    res.send({
                        msg: "All play lists received.", status: responseConstants.SUCCESS, playLists
                    });
                }
            );
        } else {
            if(req.query.listID == "all") {
                audioDAO.getAllAudios(
                    (audioDocs) => {
                        let playList = new PlayList("all", "All");
    
                        if(audioDocs != null && audioDocs.length > 0) {
                            playList.audios = audioDocs;
                        }
    
                        res.send({
                            msg: "The play list retrieved.", status: responseConstants.SUCCESS, playList
                        });
                    }
                );
            } else {
                playListDAO.getPlayList(
                    req.query.listID,
                    (playListDoc) => {
                        if(playListDoc == null) {
                            res.send({
                                msg: "The play not found!", 
                                status: responseConstants.FAIL
                            });
    
                            return;
                        }
    
                        let playList = new PlayList(playListDoc._id, playListDoc.listName);
    
                        audioDAO.getAudios(
                            playListDoc.audios,
                            (audioDocs) => {
                                if(audioDocs != null) {
                                    playList.audios = audioDocs;
                                }
    
                                res.send({
                                    msg: "The play list retrieved.", 
                                    status: responseConstants.SUCCESS, 
                                    playList
                                });
                            }
                        );
                    }
                );
            }
        }
    }
);

playListController.post(
    "/",
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
                delete playList.audios;

                res.send({
                    msg: "Play list have been saved.", status: responseConstants.SUCCESS, playList: playList
                });
            }
        );
    }
);

playListController.put(
    "/",
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

playListController.delete(
    "/",
    (req, res) => {
        if(!req.body.audioID || req.body.audioID == "") {
            playListDAO.deletePlayList(
                req.body.listID,
                (dbOpRes) => {
                    if(dbOpRes != dbOperationConstants.EXECUTION_SUCCESS) {
                        res.status(500);
                        res.send({msg: "Play list couldn't deleted!", status: responseConstants.FAIL});
                    } else {
                        res.send({msg: "Play list deleted.", status: responseConstants.SUCCESS});
                    }
                }
            );
        } else {
            playListDAO.getPlayList(
                req.body.listID,
                (playList) => {
                    let filteredAudios = playList.audios.filter(
                        (listAudioID) => listAudioID != req.body.audioID
                    );

                    if(filteredAudios.length != playList.audios.length) {
                        playList.audios = filteredAudios;

                        playListDAO.updatePlayList(
                            playList,
                            (dbOpRes) => {
                                if(dbOpRes != dbOperationConstants.EXECUTION_SUCCESS) {
                                    res.status(500);
                                    res.send({
                                        msg: "Audio couldn't deleted from play list!", 
                                        status: responseConstants.FAIL
                                    });
                                } else {
                                    res.send({msg: "Audio deleted from play list.", status: responseConstants.SUCCESS});
                                }
                            }
                        );
                    } else {
                        res.send({msg: "There is nothing to delete.", status: responseConstants.SUCCESS});
                    }
                }
            );
        }
    }
);

module.exports = playListController;
