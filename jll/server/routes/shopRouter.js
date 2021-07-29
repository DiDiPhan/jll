const express = require('express');
const bodyParser = require('body-parser');

const shopRouter = express.Router();
shopRouter.use(bodyParser.json());

shopRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
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

shopRouter.route('/:bookName')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {
        res.render('pages/shop');
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.write("Updating books named: " + req.params.bookName + "\n");
        for (var key of Object.keys(req.body)) {
            res.write(key + "->" + req.body[key] + "\n");
        }
        res.end();
    })
    .post((req, res, next) => {
        res.end("POST operation is not supported on /" + req.params.bookName);
    })
    .delete((req, res, next) => {
        res.end("Deleting " + req.params.bookName);
    })


module.exports = shopRouter;