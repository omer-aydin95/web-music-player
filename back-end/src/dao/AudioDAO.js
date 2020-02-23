const mongoDBClient = require("../db-client/MongoDBClient");

const client = mongoDBClient.getClient();

function getAllAudios(callback) {
    client.connect().then(
        (client) => {
            const coll = client.db(mongoDBClient.connectedDB).collection("audios");

            coll.find({}).toArray().then(
                (docs) => {
                    callback(docs);
                }
            ).catch(
                (err) => {
                    console.error(`Error while getting all audios: ${err}`);

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
    getAllAudios: getAllAudios
};
