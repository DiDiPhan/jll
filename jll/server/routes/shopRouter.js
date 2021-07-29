const express = require('express');
const bodyParser = require('body-parser');

const shopRouter = express.Router();
shopRouter.use(bodyParser.json());

shopRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        next();
    })
    .get((req,res, next) => {
        res.render('pages/shop');
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end("PUT operation is not supported on /shop.");
    })
    .post((req, res, next) => {
        res.end("Creating new books named: " + req.body.name);
    })
    .delete((req, res, next) => {
        res.end("Deleting all books.");
    })

module.exports = shopRouter;