/**
 * Created by wtwei on 2015/10/30.
 * redis管理
 */
var redis = require('redis');
var config = require('../config');
var redisClient = redis.createClient({port: config.redis.port, host: config.redis.host, password: config.redis.password, prefix: 'halosearch'});
var Promise = require('bluebird');
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);
var obj = {};

redisClient.on('error', function(err){
    if (err) {
        console.log('Error ' + err);
    }
});

redisClient.on('connect', function(){
    console.log('Redis is ready');
});

// 清除缓存
obj.clear = function(name){
    redisClient.set(name, null);
};

// 设置缓存
obj.set = function(name, data, time){
    if (time && time > 0) {
        redisClient.set(name, data, 'EX', time);
    } else {
        redisClient.set(name, data);
    }
};

// 获取缓存
obj.get = function(name){
    return redisClient.getAsync(name);
};

module.exports = obj;