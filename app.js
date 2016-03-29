var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require('./config');
var helper = require('./helper');
var _ = require('lodash/object');
var redis = require('./module/redis');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

_.assign(app.locals, helper);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 数据处理中间件
app.use(function(req, res, next){
    req.config = config;
    req.redis = redis;
    console.log('ip====' + (req.header('x-forwarded-for') || req.connection.remoteAddress));
    next();
});

config.route(app);

// catch 404 and forward to error handler
app.use(function(req, res, next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next){
        res.status(err.status || 500);
        switch (err.status){
            case 404:
                res.render('404', {});
                break;
            default:
                res.render('error', {
                    message: err.message,
                    error: err
                });
        }
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next){
    res.status(err.status || 500);

    switch (err.status){
        case 404:
            res.render('404', {});
            break;
        default:
            res.render('error', {
                message: err.message,
                error: {}
            });
    }

});


module.exports = app;
