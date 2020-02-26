const mongoDBClient = require("../db-client/MongoDBClient");
const collectionConstants = require("../constant/CollectionConstants");
const dbOperationConstants = require("../constant/DBOperationConstants");

const client = mongoDBClient.getClient();

function getAllPlayLists(callback) {
    client.connect().then(
        (client) => {
            const coll = client.db(mongoDBClient.connectedDB).collection(collectionConstants.COLL_PLAY_LISTS);

            coll.find({}).toArray().then(
                (docs) => {
                    callback(docs);
                }
            ).catch(
                (err) => {
                    console.error(`Error while getting all play lists: ${playListID} ${err}`);

                    callback(null);
                }
            );
        }
    ).catch(
        (err) => {
            console.error(`Error while connecting to server: ${err}`);

            callback(null);
        }
    );
}

function getPlayList(playListID, callback) {
    client.connect().then(
        (client) => {
            const coll = client.db(mongoDBClient.connectedDB).collection(collectionConstants.COLL_PLAY_LISTS);

            coll.findOne({_id: new mongoDBClient.ObjectId(playListID)}).then(
                (doc) => {
                    callback(doc);
                }
            ).catch(
                (err) => {
                    console.error(`Error while getting the play list with ID: ${playListID} ${err}`);

                    callback(null);
                }
            );
        }
    ).catch(
        (err) => {
            console.error(`Error while connecting to server: ${err}`);

            callback(null);
        }
    );
}

function savePlayList(playList, callback) {
    client.connect().then(
        (client) => {
            const coll = client.db(mongoDBClient.connectedDB).collection(collectionConstants.COLL_PLAY_LISTS);

            coll.insertOne(playList).then(
                (res) => {
                    callback(res.insertedId);
                }
            ).catch(
                (err) => {
                    console.error(`Error while saving play list: ${err}`);

                    callback(null);
                }
            );
        }
    ).catch(
        (err) => {
            console.error(`Error while connecting to server: ${err}`);

            callback(null);
        }
    );
}

function updatePlayList(playList, callback) {
    client.connect().then(
        (client) => {
            const coll = client.db(mongoDBClient.connectedDB).collection(collectionConstants.COLL_PLAY_LISTS);

            let query = {
                _id: playList._id,
            };

            let opts = {
                $set: {
                    audios: playList.audios
                }
            }

            coll.updateOne(query, opts).then(
                (res) => {
                    if(res.modifiedCount == 0) {
                        callback(dbOperationConstants.NO_ROWS_MODIFIED);
                    } else {
                        callback(dbOperationConstants.EXECUTION_SUCCESS);
                    }
                }
            ).catch(
                (err) => {
                    console.error(`Error while updating the play list ${playList._id}: ${err}`);

                    callback(dbOperationConstants.EXECUTION_FAIL);
                }
            );
        }
    ).catch(
        (err) => {
            console.error(`Error while connecting to server: ${err}`);

            callback(dbOperationConstants.EXECUTION_FAIL);
        }
    );
}

function deletePlayList(playListID, callback) {
    client.connect().then(
        (client) => {
            const coll = client.db(mongoDBClient.connectedDB).collection(collectionConstants.COLL_PLAY_LISTS);

            coll.deleteOne({_id: new mongoDBClient.ObjectId(playListID)}).then(
                (res) => {
                    if(res.deletedCount == 0) {
                        callback(dbOperationConstants.NO_ROWS_MODIFIED);
                    } else {
                        callback(dbOperationConstants.EXECUTION_SUCCESS);
                    }
                }
            ).catch(
                (err) => {
                    console.error(`Error while deleting the play list ${playList._id}: ${err}`);

                    callback(dbOperationConstants.EXECUTION_FAIL);
                }
            );
        }
    ).catch(
        (err) => {
            console.error(`Error while connecting to server: ${err}`);

            callback(dbOperationConstants.EXECUTION_FAIL);
        }
    );
}

module.exports = {
    getPlayList: getPlayList,
    getAllPlayLists: getAllPlayLists,
    savePlayList: savePlayList,
    updatePlayList: updatePlayList,
    deletePlayList: deletePlayList
};
