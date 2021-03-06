const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./server/routes/indexRouter');
const usersRouter = require('./server/routes/userRouter');
const shopRouter = require('./server/routes/shopRouter');
const Books = require('./server/models/books');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(
  `mongodb+srv://membreHKTDV:hcmus-hktdv@jll.yq3fm.mongodb.net/jll?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).then(() => {
    console.log("Database connected.")
  });


// view engine setup
app.set('views', path.join(__dirname, 'server','views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/shop', shopRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pages/error');
});

module.exports = app;
