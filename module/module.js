/**
 * Created by wtwei on 2016/2/20.
 */

var Promise = require("bluebird"),
    request = Promise.promisifyAll(require("request")),
    querystring = require('querystring'),
    config = require('../config'),
    mod = {};

mod.getList = function(path, req, params){
    params = params ? params : {};
    params.sid = global.sid;
    params.page = req.query.page ? req.query.page : (params.page ? params.page : 1);
    params.per_page = req.query.per_page ? req.query.per_page : (params.per_page ? params.per_page : 6);

    var headers = {'x-forwarded-for': req.header('x-forwarded-for') || req.connection.remoteAddress},
        options = {
            url: config.apiUrl + '/' + path + '?' + querystring.stringify(params),
            form: {},
            headers: headers
        };
    return request.getAsync(options).then(function(res){
        return JSON.parse(res.body);
    }).error(function(err){
        console.log(err);
        return {iRet: -1};
    });
};

// 创建
mod.add = function(path, postData, req){
    postData.sid = global.sid;
    postData.company_id = global.company_id;
    var headers = {'x-forwarded-for': req.header('x-forwarded-for') || req.connection.remoteAddress},
        options = {url: config.apiUrl + '/' + path, form: postData, headers: headers};
    return request.postAsync(options).then(function(res){
        return JSON.parse(res.body);
    }).error(function(err){
        console.log(err);
        return {iRet: -1};
    });
};

// 编辑
mod.edit = function(path, postData, req){
    postData.sid = global.sid;
    var headers = {'x-forwarded-for': req.header('x-forwarded-for') || req.connection.remoteAddress},
        options = {url: config.apiUrl + '/' + path + '/' + postData.id, form: postData, headers: headers};
    return request.putAsync(options).then(function(res){
        return JSON.parse(res.body);
    }).error(function(err){
        console.log(err);
        return {iRet: -1};
    });
};

// 删除
mod.delete = function(path, id, req){
    var headers = {'x-forwarded-for': req.header('x-forwarded-for') || req.connection.remoteAddress},
        options = {url: config.apiUrl + '/' + path + '/' + id + '?uid=' + req.user.id, headers: headers};
    return request.delAsync(options).then(function(res){
        return JSON.parse(res.body);
    }).error(function(err){
        console.log(err);
        return {iRet: -1};
    });
};

// 获取
mod.getInfo = function(path, id, req){
    var headers = {'x-forwarded-for': req.header('x-forwarded-for') || req.connection.remoteAddress},
        options = {url: config.apiUrl + '/'+ path +'/' + id + '?if_show=1', headers: headers};
    return request.getAsync(options).then(function(res){
        return JSON.parse(res.body);
    }).error(function(err){
        console.log(err);
        return {iRet: -1};
    });
};

// 通用获取
mod.get = function(url, req, params){
    params = params ? querystring.stringify(params) : '';

    var headers = {'x-forwarded-for': req.header('x-forwarded-for') || req.connection.remoteAddress},
        options = {
            url: config.apiUrl + '/' + url + '?sid=' + global.sid + '&page=' + req.params.page + '&' + params,
            form: {},
            headers: headers
        };
    return request.getAsync(options).then(function(res){
        return JSON.parse(res.body);
    }).error(function(err){
        console.log(err);
        return {iRet: -1};
    });
};

// 通用编辑
mod.put = function(url,postData, req){
    postData.sid = global.sid;
    var headers = {'x-forwarded-for': req.header('x-forwarded-for') || req.connection.remoteAddress},
        options = {url: config.apiUrl + url, form: postData, headers: headers};
    return request.putAsync(options).then(function(res){
        return JSON.parse(res.body);
    }).error(function(err){
        console.log(err);
        return {iRet: -1};
    });
};

// 通用新增
mod.post = function(url,postData, req){
    postData.sid = global.sid;
    var headers = {'x-forwarded-for': req.header('x-forwarded-for') || req.connection.remoteAddress},
        options = {url: config.apiUrl + url, form: postData, headers: headers};
    return request.postAsync(options).then(function(res){
        return JSON.parse(res.body);
    }).error(function(err){
        console.log(err);
        return {iRet: -1};
    });
};

module.exports = mod;