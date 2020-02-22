const mongoDBClient = require("../db-client/MongoDBClient");

const client = mongoDBClient.getClient();

function getAudio(audioID, callback) {
    client.connect().then(
        (client) => {
            const coll = client.db(mongoDBClient.connectedDB).collection("users");

            coll.findOne({_id: audioID}).then(
                (doc) => {
                    callback(doc);
                }
            ).catch(
                (err) => {
                    console.log(`Error on find: ${err}`);

                    callback(null);
                }
            ).finally(
                () => {
                    client.close();
                }
            );
        }
    ).catch(
        (err) => {
            console.log(`Error on connect: ${err}`);

            client.close();

            callback(null);
        }
    )
}

module.exports = {
    getAudio: getAudio
};
