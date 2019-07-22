var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var signalRouter = require('./routes/signal')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/signal', signalRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, _next) {
  // set locals, only providing error in development
  const isDev = req.app.get('env') === 'development'
  const message = isDev ? err.message : 'internal error'

  // render the error page
  res.status(err.status || 500)
  res.json({
    error: true,
    message
  })
})

module.exports = app
