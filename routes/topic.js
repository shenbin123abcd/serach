var express = require('express');
var router = express.Router();
var obj = require('../module/module');
var token = require('../module/token');
var url = require('url');

// 列表
router.get('/', function(req, res, next){
    var params = {per_page: req.config.perPage.picture};

    obj.getList('zhuanti', req, params).then(function(body){
        if (body.iRet === 1) {
            var data = body.data;

            //res.json(data);
            return data;
            // res.render('topic_index', {title: '专题列表'});
        } else {
            res.sendStatus(500);
        }
    }, function(error){
        console.log(error);
        res.sendStatus(500);
    }).then(function(data){
        var data=data;

        data.data.forEach((n,i)=>{
            n.default_image=req.config.url.case+'/' +n.default_image+'?imageView2/1/w/900/h/482';
        });

        data.baseUrl=req.baseUrl;
        data.absUrl=req.protocol+'://'+req.get('host')+req.originalUrl;
        data.query=req.query;

        var urlObj=url.parse(data.absUrl);
        data.route=urlObj.pathname.replace(req.baseUrl,'');

        data.pageTitle='专题首页';
        data.tag=req.query.tag;
        data.sort=req.query.sort;


        data.totalPages=Math.ceil(data.total/data.per_page);

        res.render('topic_index', {data: data});

    });
});

// 详情
router.get('/detail/:id', function(req, res, next){
    var id = parseInt(req.params.id);

    if(id <= 0 || isNaN(id)){
        res.sendStatus(404);
        return false;
    }

    obj.getInfo('zhuanti',id, req, {if_company: 1}).then(function(body){
        if(body.iRet === 1){
            var data = body.data;
            data.default_image = req.config.url.case + '/' + data.default_image + '?imageView/1/w/900/h/481/q/85'
            if(data.case.length > 0){
                data.case.forEach(function(val, index){
                    val.images = [
                        req.config.url.case + '/' + val.img1 + '?imageView/1/w/900/h/480/q/85',
                        req.config.url.case + '/' + val.img2 + '?imageView/1/w/900/h/480/q/85'
                    ];
                })
            }
            //res.json(data);

            return data;
            // res.render('topic_detail', {title: '专题详情'});
        }else if(body.iRet === 0){
            res.sendStatus(404);
        }else{
            res.sendStatus(500);
        }
    }, function(error){
        res.sendStatus(500);
    }).then(function(data){
        var data=data;

        data.case.forEach((n,i)=>{
            n.company.logo=req.config.url.case+'/' +n.company.logo+'?imageView2/1/w/82/h/82';
        });

        data.baseUrl=req.baseUrl;
        data.absUrl=req.protocol+'://'+req.get('host')+req.originalUrl;
        data.query=req.query;

        var urlObj=url.parse(data.absUrl);
        data.route=urlObj.pathname.replace(req.baseUrl,'');

        data.pageTitle=data.title+'专题详情';
        data.tag=req.query.tag;
        data.sort=req.query.sort;


        data.totalPages=Math.ceil(data.total/data.per_page);

        res.render('topic_detail', {data: data});

    });
});

// 新增评论
router.post('/comment',token.verifyToken, function(req, res, next){
    var data = req.body;

    if (!data.content){
        res.json({iRet: 0, info: '评论内容不能为空'});
    }
    data.module = 'zhuanti';
    data.uid = req.user.id;
    data.username = req.user.username;
    obj.add('comment', data, req).then(function(body){
        if(body.iRet === 1){
            res.json({iRet: 1, info: '评论成功'});
        }else if(body.iRet === 0){
            res.json({iRet: 0, info: '网络繁忙，请稍候再试', error: body.info});
        }else{
            res.sendStatus(500);
        }
    }, function(error){
        res.sendStatus(500);
    });
});

// 获取评论列表
router.get('/comment/:id', function(req, res){
    var id = req.params.id;
    if(!id){
        res.json({iRet: 0, info: '参数错误'});
        return false;
    }

    obj.getList('comment', req, {module: 'zhuanti', record_id: id, per_page: req.config.perPage.comments}).then(function(body){
        if(body.iRet === 1){
            res.json({iRet: 1, info: 'success', data: body.data});
        }else{
            res.json({iRet: 0, info: '网络繁忙，请稍候再试', error: body.info});
        }
    }, function(error){
        res.json(500,{iRet: 0, info: '网络繁忙，请稍候再试', error: error});
    });
});

// 收藏
router.post('/collect',token.verifyToken, function(req, res, next){
    var data = req.body;

    if (!data.record_id){
        res.json({iRet: 0, info: '参数错误'});
    }
    data.module = 'zhuanti';
    data.uid = req.user.id;
    obj.add('collect', data, req).then(function(body){
        if(body.iRet === 1){
            res.json({iRet: 1, info: '收藏成功'});
        }else if(body.iRet === 0){
            res.json({iRet: 0, info: '网络繁忙，请稍候再试', error: body.info});
        }else{
            res.sendStatus(500);
        }
    }, function(error){
        res.sendStatus(500);
    });
});

// 取消收藏
router.delete('/collect/:id',token.verifyToken, function(req, res, next){
    var id = req.params.id;

    if (!id){
        res.json({iRet: 0, info: '参数错误'});
    }

    obj.delete('zhuanti', id, req).then(function(body){
        if(body.iRet === 1){
            res.json({iRet: 1, info: '操作成功'});
        }else if(body.iRet === 0){
            res.json({iRet: 0, info: '网络繁忙，请稍候再试', error: body.info});
        }else{
            res.sendStatus(500);
        }
    }, function(error){
        res.sendStatus(500);
    });
});

module.exports = router;
