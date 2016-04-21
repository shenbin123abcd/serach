/**
 * Created by wtwei on 2015/10/30.
 */
//var redisClient = require('./redis_database').redisClient;
var jwt = require("jsonwebtoken");
var config = require('../config');
var TOKEN_EXPIRATION = 60;
var TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION * 60;

var getToken = function(req) {
    var headers=req.headers;
    if (headers && headers.authorization) {
        var authorization = headers.authorization;
        var part = authorization.split(' ');

        if (part.length == 2) {
            return part[1];
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
};

// 验证token
exports.verifyToken = function (req, res, next) {
    var path = req.url.split('/')[1];
    if(config.NOT_CHECK_AUTH.indexOf(path) != -1){
        next();
    }else{
        var token = getToken(req);

        jwt.verify(token,config.JWT_SECRET, function(err, decoded){
            if(err){
                res.status(401).json({iRet: -1, info: 'Access Denied'});
            }else{
                req.user = decoded;
                next();
            }
        });
    }
};
// 获取用户信息token
exports.getUser = function (req, res, next) {
    var path = req.url.split('/')[1];
    if(config.NOT_CHECK_AUTH.indexOf(path) != -1){
        next();
    }else{
        var token = req.cookies.halo_token;


        jwt.verify(token,config.JWT_SECRET, function(err, decoded){
            if(err){
                req.user = {};
            }else{
                req.user = decoded;

            }
            next();
        });
    }
};

// 设置token过期
exports.expireToken = function(headers) {
    var token = getToken(headers);

    if (token != null) {
        redisClient.set(token, { is_expired: true });
        redisClient.expire(token, TOKEN_EXPIRATION_SEC);
    }
};

// 设置token缓存
exports.setCache = function(data){
    redisClient.hmset('TOKEN:' + data.token, data);
};

// 获取token缓存
exports.getCache = function(){
    return redisClient.hgetall('TOKEN:' + getToken());
};

