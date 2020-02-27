const {Router} = require("express");
const responseConstants = require("../constant/ResponseConstants");
const httpMethodConstants = require("../constant/HttpMethodConstants");

const playListMiddleware = Router();

playListMiddleware.use(
    "/",
    (req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.setHeader("Access-Control-Allow-Methods", 
            `${httpMethodConstants.METHOD_GET}, ${httpMethodConstants.METHOD_POST}, ${httpMethodConstants.METHOD_PUT}, ${httpMethodConstants.METHOD_DELETE}, ${httpMethodConstants.METHOD_OPTIONS}`);

        if(req.method.toLocaleUpperCase() == httpMethodConstants.METHOD_GET) {
            if(!req.query.listID || req.query.listID == "") {
                console.info(`Accessing all lists from origin ${req.headers["origin"]}`);
            } else {
                console.info(`Accessing the list ${req.query.listID} from origin ${req.headers["origin"]}`);
            }

            next();
        } else if(req.method.toUpperCase() == httpMethodConstants.METHOD_POST) {
            if(!req.body.listName || req.body.listName == "") {
                console.info(`'listName' param required and cannot be left blank! origin: ${req.headers["origin"]}`);
            
                res.status(400);
                res.send({msg: "'listName' param required and cannot be left blank!", status: responseConstants.FAIL});
            } else {
                next();
            }
        } else if(req.method.toUpperCase() == httpMethodConstants.METHOD_PUT) {
            if(!req.body.listID || req.body.listID == "" || !req.body.audioID || req.body.audioID == "") {
                console.info(`'listID' and 'audioID' params required and cannot be left blank! origin: ${req.headers["origin"]}`);
            
                res.status(400);
                res.send({msg: "'listName' and 'audioID' params required and cannot be left blank!", status: responseConstants.FAIL});
            } else {
                next();
            }
        } else if(req.method.toUpperCase() == httpMethodConstants.METHOD_DELETE) {
            if(!req.body.listID || req.body.listID == "") {
                console.info(`'listID' param required and cannot be left blank! origin: ${req.headers["origin"]}`);
            
                res.status(400);
                res.send({msg: "'listID' param required and cannot be left blank!", status: responseConstants.FAIL});
            } else {
                next();
            }
        } else if(req.method.toLocaleUpperCase() == httpMethodConstants.METHOD_OPTIONS) {
            res.status(200);
            res.send();
        } else {
            console.info(`Unsupported http request method! origin: ${req.headers["origin"]}`);
            
            res.status(405);
            res.send({msg: "Method not allowed!", status: responseConstants.FAIL});
        }
    }
);

module.exports = playListMiddleware;
