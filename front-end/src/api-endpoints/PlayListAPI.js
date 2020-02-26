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
