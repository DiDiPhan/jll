const express = require('express');
const bodyParser = require('body-parser');

const indexRouter = express.Router();
indexRouter.use(bodyParser.json());

indexRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req,res, next) => {
        res.render('pages/index');
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end("PUT operation is not supported on /");
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("POST operation is not supported on /");
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end("DELETE operation is not supported on /");
    })
    
module.exports = indexRouter;
