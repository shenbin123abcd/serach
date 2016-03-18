var express = require('express');
var router = express.Router();
var obj = require('../module/module');
var token = require('../module/token');

// 列表
router.get('/', function(req, res, next){
    var params = {per_page: req.config.perPage.picture};

    obj.getList('zhuanti', req, params).then(function(body){
        if (body.iRet === 1) {
            var data = body.data;


            res.json(data);
            // res.render('topic_index', {title: '专题列表'});
        } else {
            res.sendStatus(500);
        }
    }, function(error){
        console.log(error);
        res.sendStatus(500);
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
            data.cover = req.config.url.case + '/' + data.default_image + '?imageView/1/w/200/h/150/q/85'
            if(data.case.length > 0){
                data.case.forEach(function(val, index){
                    val.images = [
                        req.config.url.case + '/' + val.img1 + '?imageView/1/w/200/h/150/q/85',
                        req.config.url.case + '/' + val.img2 + '?imageView/1/w/200/h/150/q/85'
                    ];
                })
            }

            res.json(data);
            // res.render('topic_detail', {title: '专题详情'});
        }else if(body.iRet === 0){
            res.sendStatus(404);
        }else{
            res.sendStatus(500);
        }
    }, function(error){
        res.sendStatus(500);
    });
});

// 新增评论
router.post('/comment',token.verifyToken, function(req, res, next){
    var data = req.body;

    if (!data.content){
        res.json({iRet: 0, info: '评论内容不能为空'});
    }
    data.module = 'case';
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
