/**
 * Created by wtwei on 2015/11/17.
 */
var express = require('express');
var router = express.Router();
//var api = require('../module/api');
var token = require('../module/token');
var obj = require('../module/module');

router.get('/checkLogin', token.verifyToken, function(req, res){
    res.json({iRet: 1, info: 'success'});
});


router.get('/total', function(req, res){
    req.redis.get('allTotal').then(function(data){
        if(!data){
            obj.getList('auto/allTotal',req).then(function(ret){
                console.log(ret);
                req.redis.set('allTotal', JSON.stringify(ret.data), 43200);
                res.json({iRet: 1, info: 'success', data: ret.data});
            });
        }else{
            console.log('cache');
            res.json({iRet: 1, info: 'success', data: JSON.parse(data)});
        }
    });


});

module.exports = router;