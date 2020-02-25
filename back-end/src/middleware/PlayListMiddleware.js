const {Router} = require("express");
const responseConstants = require("../constant/ResponseConstants");

const playListMiddleware = Router();

playListMiddleware.use(
    "/getList",
    (req, res, next) => {
        console.info(`Accessing the list ${req.query.listID} from origin ${req.headers["origin"]}`);

        res.setHeader("Access-Control-Allow-Origin", "*");

        next();
    }
);

playListMiddleware.use(
    "/getAllLists",
    (req, res, next) => {
        console.info(`Accessing all lists from origin ${req.headers["origin"]}`);

        res.setHeader("Access-Control-Allow-Origin", "*");

        next();
    }
);

playListMiddleware.use(
    "/saveList",
    (req, res, next) => {
        console.info(`List saving request from origin ${req.headers["origin"]}`);

        res.setHeader("Access-Control-Allow-Origin", "*");

        if(!req.body.listName || req.body.listName == "") {
            console.info(`'listName' param required and cannot be left blank! origin: ${req.headers["origin"]}`);
            
            res.status(400);
            res.send({msg: "'listName' param required and cannot be left blank!", status: responseConstants.FAIL});

            return;
        }

        next();
    }
);

playListMiddleware.use(
    "/updateList",
    (req, res, next) => {
        console.info(`List updating request from origin ${req.headers["origin"]}`);

        res.setHeader("Access-Control-Allow-Origin", "*");

        if(!req.body.listID || !req.body.audioID || req.body.listID == "" || req.body.audioID == "") {
            console.info(`'listID' and 'audioID' params required and cannot be left blank! origin: ${req.headers["origin"]}`);
            
            res.status(400);
            res.send({msg: "'listName' and 'audioID' params required and cannot be left blank!", status: responseConstants.FAIL});

            return;
        }

        next();
    }
);

module.exports = playListMiddleware;
