import * as httpMethodConstants from "../constants/HttpMethodConstants";

const API_ENDPOINT = "http://localhost:5991/play-lists";

export const getAllPlayLists = (callback) => {
    fetch(API_ENDPOINT).then(
        (res) => res.json()
    ).then(
        (allPlayLists) => {
            callback(allPlayLists);
        }
    ).catch(
        (err) => {
            console.error(`Error while fetching all lists: ${err}`);

            callback(null);
        }
    );
}

export const getPlayList = (playListID, callback) => {
    fetch(API_ENDPOINT + "?listID=" + playListID).then(
        (res) => res.json()
    ).then(
        (playList) => {
            callback(playList);
        }
    ).catch(
        (err) => {
            console.error(`Error while fetching the list: ${err}`);

            callback(null);
        }
    );
}

export const createPlayList = (playListName, callback) => {
    fetch(API_ENDPOINT, {
        method: httpMethodConstants.METHOD_POST,
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({listName: playListName})
    }).then(
        (res) => res.json()
    ).then(
        (playList) => {
            callback(playList);
        }
    ).catch(
        (err) => {
            console.error(`Error while created the list: ${err}`);

            callback(null);
        }
    );
}

export const addAudioToPlayList = (playListID, audioID, callback) => {
    fetch(API_ENDPOINT, {
        method: httpMethodConstants.METHOD_PUT,
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({listID: playListID, audioID: audioID})
    }).then(
        (res) => res.json()
    ).then(
        (data) => {
            callback(data);
        }
    ).catch(
        (err) => {
            console.error(`Error while created the list: ${err}`);

            callback(null);
        }
    );
}

export const deleteAudioFromPlayList = (playListID, audioID, callback) => {
    fetch(API_ENDPOINT, {
        method: httpMethodConstants.METHOD_DELETE,
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({listID: playListID, audioID: audioID})
    }).then(
        (res) => res.json()
    ).then(
        (data) => {
            callback(data);
        }
    ).catch(
        (err) => {
            console.error(`Error while created the list: ${err}`);

            callback(null);
        }
    );
}

export const deletePlayList = (playListID, callback) => {
    fetch(API_ENDPOINT, {
        method: httpMethodConstants.METHOD_DELETE,
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({listID: playListID})
    }).then(
        (res) => res.json()
    ).then(
        (data) => {
            callback(data);
        }
    ).catch(
        (err) => {
            console.error(`Error while created the list: ${err}`);

            callback(null);
        }
    );
}
