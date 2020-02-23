const {Router} = require("express");

const audioMiddleware = Router();

audioMiddleware.use(
    "/getAll",
    (req, res, next) => {
        console.info(`Accessing all audio from host ${req.headers["host"]}`);

        res.setHeader("Access-Control-Allow-Origin", "http://localhost:1995");

        next();
    }
);

module.exports = audioMiddleware;
