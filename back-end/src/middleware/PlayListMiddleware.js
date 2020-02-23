const {Router} = require("express");

const playListMiddleware = Router();

playListMiddleware.use(
    "/getList",
    (req, res, next) => {
        console.info(`Accessing the list ${req.query.listID} from host ${req.headers["host"]}`);

        res.setHeader("Access-Control-Allow-Origin", req.headers["host"]);

        next();
    }
);

playListMiddleware.use(
    "/getAllLists",
    (req, res, next) => {
        console.info(`Accessing all lists from host ${req.headers["host"]}`);

        res.setHeader("Access-Control-Allow-Origin", req.headers["host"]);

        next();
    }
);

module.exports = playListMiddleware;
