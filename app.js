var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

var studentsRouter = require('./routes/students');
var gradesRouter = require('./routes/grades')
var historyRouter = require('./routes/history')
var registerRouter = require('./routes/register')
var loginRouter = require('./routes/login')
var uploadRouter = require('./routes/upload')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//全局中间件
function middlewareFunc(req, res, next) {
   const token = req.headers.authorization
   if(!token){
     res.json({
        code: '1111',
        msg: '请先登录'
     })
   }else {
     next()
   }
} 
app.use('/register', registerRouter)
app.use('/login',loginRouter)
app.use(middlewareFunc)
app.use('/student', studentsRouter);
app.use('/grade', gradesRouter)
app.use('/history', historyRouter)
app.use('/upload', uploadRouter)

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
  // res.render('error');
});

module.exports = app;
