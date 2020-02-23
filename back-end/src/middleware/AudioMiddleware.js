const {Router} = require("express");

const audioMiddleware = Router();

audioMiddleware.use(
    "/getAll",
    (req, res, next) => {
        console.info(`Accessing all audio from host ${req.headers["host"]}`);

        res.setHeader("Access-Control-Allow-Origin", req.headers["host"]);

        next();
    }
);

module.exports = audioMiddleware;
