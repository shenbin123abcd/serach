var express = require('express');
var router = express.Router();
var obj = require('../module/module');

/* GET home page. */
router.get('/', function(req, res, next){
    // 最新案例
    var data = {};
    obj.getList('cases', req, {per_page: 13}).then(function(body){
        if(body.iRet === 1){
            data.case_new = body.data.data;
            return data;
        }else{
            res.sendStatus(500);
        }
    }, function(error){
        res.sendStatus(500);
    }).then(function(data){
        return obj.getList('cases', req, {per_page: 12}).then(function(body){
            if(body.iRet === 1){
                data.case_recommend = body.data.data;
                return data;
            }else{
                res.sendStatus(500);
            }
        })
    }).then(function(data){
        // 精选案例
        return obj.getList('cases', req, {per_page: 12}).then(function(body){
            if(body.iRet === 1){
                data.case_recommend = body.data.data;
                return data;
            }else{
                res.sendStatus(500);
            }
        })
    }).then(function(data){
        // 精选专题
        return obj.getList('zhuanti', req, {per_page: 6}).then(function(body){
            if(body.iRet === 1){
                data.zhuanti = body.data.data;
                return data;
            }else{
                res.sendStatus(500);
            }
        })
    }).then(function(data){
        // 图片
        return obj.getList('picture/tag', req, {per_page: 12}).then(function(body){
            if(body.iRet === 1){
                data.image = body.data.data;
                return data;
            }else{
                res.sendStatus(500);
            }
        })
    }).then(function(data){
        // 公司
        return obj.getList('company', req, {per_page: 12}).then(function(body){
            if(body.iRet === 1){
                data.company = body.data.data;
                return data;
            }else{
                res.sendStatus(500);
            }
        })
    }).then(function(data){
        //var data = {
        //    pageTitle: '首页',
        //    list: [],
        //};

        res.json(data);
        //res.render('index', {data: data});
    });


});

module.exports = router;
