const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Books = require('../models/books');

const shopRouter = express.Router();
shopRouter.use(bodyParser.json());

shopRouter.route('/')
    .get((req, res, next) => {
        Books.find({})
            .then((books) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(books);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end("PUT operation is not supported on /shop.");
    })
    .post((req, res, next) => {
        Books.create(req.body)
            .then((book) => {
                console.log("Book created: ", book);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(book);
            }, (err) => next(err))
            .catch((err) => next(err));
        
    })
    .delete((req, res, next) => {
        Books.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

shopRouter.route('/:bookID')
    .get((req, res, next) => {
        Books.findById(req.params.bookID)
            .then((book) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(book);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("POST operation is not supported on /shop:bookID.");
    })
    .put((req, res, next) => {
        Books.findByIdAndUpdate(req.params.bookID, {
            $set: req.body
        }, { new: true })
            .then((book) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(book);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Books.findByIdAndRemove(req.params.bookID)
            .then((book) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(book);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

shopRouter.route('/:bookID/reviews')
    .get((req, res, next) => {
        Books.findById(req.params.bookID)
            .then((book) => {
                if (book != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(book.reviews);
                }
                else {
                    err = new Error('Book ' + req.params.bookID + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Books.findById(req.params.bookID)
            .then((book) => {
                if (book != null) {
                    book.reviews.push(req.body);
                    book.save()
                        .then((book) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(book);
                        }, (err) => next(err));
                }
                else {
                    err = new Error('Book ' + req.params.bookID + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /shop/'
            + req.params.bookID + '/reviews');
    })
    .delete((req, res, next) => {
        Books.findById(req.params.bookID)
            .then((book) => {
                if (book != null) {
                    for (var i = (book.reviews.length - 1); i >= 0; i--) {
                        book.reviews.id(book.reviews[i]._id).remove();
                    }
                    book.save()
                        .then((book) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(book);
                        }, (err) => next(err));
                }
                else {
                    err = new Error('Book ' + req.params.bookID + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

shopRouter.route('/:bookID/reviews/:reviewID')
    .get((req, res, next) => {
        Books.findById(req.params.bookID)
            .then((book) => {
                if (book != null && book.reviews.id(req.params.reviewID) != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(book.reviews.id(req.params.reviewID));
                }
                else if (book == null) {
                    err = new Error('Book ' + req.params.bookID + ' not found');
                    err.status = 404;
                    return next(err);
                }
                else {
                    err = new Error('Review ' + req.params.reviewID + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /shop/' + req.params.bookID
            + '/reviews/' + req.params.reviewID);
    })
    .put((req, res, next) => {
        Books.findById(req.params.bookID)
            .then((book) => {
                if (book != null && book.reviews.id(req.params.reviewID) != null) {
                    if (req.body.rating) {
                        book.reviews.id(req.params.reviewID).rating = req.body.rating;
                    }
                    if (req.body.comment) {
                        book.reviews.id(req.params.reviewID).comment = req.body.comment;
                    }
                    book.save()
                        .then((book) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(book);
                        }, (err) => next(err));
                }
                else if (book == null) {
                    err = new Error('Book ' + req.params.bookID + ' not found');
                    err.status = 404;
                    return next(err);
                }
                else {
                    err = new Error('Review ' + req.params.reviewID + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Books.findById(req.params.bookID)
            .then((book) => {
                if (book != null && book.reviews.id(req.params.reviewID) != null) {
                    book.reviews.id(req.params.reviewID).remove();
                    book.save()
                        .then((book) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(book);
                        }, (err) => next(err));
                }
                else if (book == null) {
                    err = new Error('Book ' + req.params.bookID + ' not found');
                    err.status = 404;
                    return next(err);
                }
                else {
                    err = new Error('Review ' + req.params.reviewID + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = shopRouter;