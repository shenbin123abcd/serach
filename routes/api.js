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
        if (!data) {
            obj.getList('auto/allTotal', req).then(function(ret){
                req.redis.set('allTotal', JSON.stringify(ret.data), 43200);
                res.json({iRet: 1, info: 'success', data: ret.data});
            });
        } else {
            res.json({iRet: 1, info: 'success', data: JSON.parse(data)});
        }
    });
});

// 获取地区
router.get('/region', function(req, res){
    var pid = req.query.pid || 0;
    obj.get('region',req, {pid: pid}).then(function(body){
        if (body.iRet === 1) {
            res.json({iRet: 1, info: 'success', data: body.data});
        } else if (body.iRet === 0) {
            res.json({iRet: 0, info: 'failed', error: body.info});
        } else {
            res.sendStatus(500);
        }
    }, function(error){
        console.log(error);
        res.sendStatus(500);
    });
});

// 获取地区父级信息
router.get('/region/parent', function(req, res){
    var id = req.query.id || 0;
    obj.get('region/parent/' + id,req).then(function(body){
        if (body.iRet === 1) {
            res.json({iRet: 1, info: 'success', data: body.data});
        } else if (body.iRet === 0) {
            res.json({iRet: 0, info: 'failed', error: body.info});
        } else {
            res.sendStatus(500);
        }
    }, function(error){
        console.log(error);
        res.sendStatus(500);
    });
});
// 获取地区同级信息
router.get('/region/siblings', function(req, res){
    var id = req.query.id || 0;
    obj.get('region/siblings/' + id,req).then(function(body){
        if (body.iRet === 1) {
            res.json({iRet: 1, info: 'success', data: body.data});
        } else if (body.iRet === 0) {
            res.json({iRet: 0, info: 'failed', error: body.info});
        } else {
            res.sendStatus(500);
        }
    }, function(error){
        console.log(error);
        res.sendStatus(500);
    });
});


// 公司列表
router.get('/company',  function(req, res, next){
    var params = {
        per_page: 1000,
        'filter[if_show]': 1,
        'filter[cate_id]': 2,
        page: 1
    };
    if (req.query.keywords) {
        params.name = req.query.keywords;
    }
    switch (true){
        case !params.name:
            deferred.reject('请输入搜索关键字');
            break;
        case params.name.length<2:
            deferred.reject('请输入至少两个字符');
            break;
        default:
            sendXhr();
    }
    function sendXhr(){
        obj.getList('company', req, params).then(function(body){
            body.data.data.forEach(function(n,i){
                n.logo = `${req.config.url.company}/${n.logo||'404.png'}?imageView2/1/w/200/h/150`;
            });
            res.json(body);
        }, function(error){
            console.log(error);
            res.sendStatus(500);
        });
    }

});
// 公司信息

router.get('/company/:id',  function(req, res, next){
    obj.getInfo('company', req.params.id, req, {cate_id: 2}).then(function (body) {
        res.json(body);
    }, function(error){
        console.log(error);
        res.sendStatus(500);
    });



});

module.exports = router;