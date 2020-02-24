const {Router} = require("express");

const playListMiddleware = Router();

playListMiddleware.use(
    "/getList",
    (req, res, next) => {
        console.info(`Accessing the list ${req.query.listID} from origin ${req.headers["origin"]}`);

        res.setHeader("Access-Control-Allow-Origin", req.headers["origin"]);

        next();
    }
);

playListMiddleware.use(
    "/getAllLists",
    (req, res, next) => {
        console.info(`Accessing all lists from origin ${req.headers["origin"]}`);
        console.log(req.headers);

        res.setHeader("Access-Control-Allow-Origin", req.headers["origin"]);

        next();
    }
);

module.exports = playListMiddleware;
