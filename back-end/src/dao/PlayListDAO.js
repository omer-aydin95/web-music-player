const mongoDBClient = require("../db-client/MongoDBClient");
const collectionConstants = require("../constant/CollectionConstants");

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

module.exports = {
    getPlayList: getPlayList,
    getAllPlayLists: getAllPlayLists
};
