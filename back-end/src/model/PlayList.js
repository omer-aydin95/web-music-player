class PlayList {
    constructor(id = "", listName = "", audios = []) {
        this._id = id;
        this.listName = listName;
        this.audios = audios;
    }
}

module.exports = PlayList;
