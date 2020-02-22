const MongoClient = require("mongodb").MongoClient;
const config = require("../../db-config");

function getClient() {
    const connStr = `mongodb+srv://${config.username}:${config.password}@webmusicplayercluster-caxep.mongodb.net/${config.dbName}?retryWrites=true&w=majority`;

    const client = new MongoClient(connStr, config.mongoDBOpts);

    return client;
}

module.exports = {
    getClient: getClient,
    connectedDB: config.dbName
};
