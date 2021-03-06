var express = require('express');
var router = express.Router();
var obj = require('../module/module');
var token = require('../module/token');
var url = require('url');

// 列表
router.get('/', function(req, res, next){
    var params = {per_page: req.config.perPage.topic};

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
            n.default_image=req.config.url.case+'/' +n.default_image+'?imageView2/1/w/420/h/226';
        });

        data.baseUrl=req.baseUrl;
        data.absUrl=req.protocol+'://'+req.get('host')+req.originalUrl;
        data.query=req.query;

        var urlObj=url.parse(data.absUrl);
        data.route=urlObj.pathname.replace(req.baseUrl,'');

        data.pageTitle='专题 - 幻熊婚礼素材开放平台';
        data.tag=req.query.tag;
        data.sort=req.query.sort;

        data.totalPages=Math.ceil(data.total/data.per_page);

        var appData = {
            total: data.total,
            per_page: data.per_page,
            totalPages: data.totalPages,
            query: data.query,
        };
        res.render('topic_index', {data: data,appData:appData});

    });
});

// 详情
router.get('/detail/:id',token.getUser, function(req, res, next){
    var id = parseInt(req.params.id);

    if(id <= 0 || isNaN(id)){
        res.sendStatus(404);
        return false;
    }

    function getInfo(){
        return obj.getInfo('zhuanti',id, req, {if_company: 1}).then(function(body){
            var data = body.data;
            data.default_image = req.config.url.case + '/' + data.default_image + '?imageView/1/w/900/q/85'
            if(data.case.length > 0){
                data.case.forEach(function(val, index){
                    val.images = [
                        req.config.url.case + '/' + val.img1 + '?imageView/1/w/900/q/85',
                        req.config.url.case + '/' + val.img2 + '?imageView/1/w/900/q/85'
                    ];
                })
            }
            return data;
        });
    }

    function isCollect(id){
        // case if collect
        if(!req.user.id){
            return 0;
        }
        var params={
            'filter[uid]':req.user.id,
            'filter[module]':'zhuanti',
            'filter[record_id]':id,
        };
        return obj.getList('collect', req, params).then(function(body){
            return body.data.total?1:0;
        }, function(error){
            return 0;
        });
    }


    Promise.all([getInfo(), isCollect(id)]).then(function(result){
        var data = result[0];
        data.isCollect = result[1];


        data.case.forEach((n,i)=>{
            n.company.logo=req.config.url.case+'/' +n.company.logo+'?imageView2/1/w/82/h/62';
        });

        data.baseUrl=req.baseUrl;
        data.absUrl=req.protocol+'://'+req.get('host')+req.originalUrl;
        data.query=req.query;

        var urlObj=url.parse(data.absUrl);
        data.route=urlObj.pathname.replace(req.baseUrl,'');

        data.pageTitle=data.title+' - 专题详情 - 幻熊婚礼素材开放平台';
        data.tag=req.query.tag;
        data.sort=req.query.sort;
        data.totalPages=Math.ceil(data.total/data.per_page);

        var appData = {
            id: data.id,
            query: data.query,
        };

        res.render('topic_detail', {data: data,appData:appData});

    }).catch(function(error){
        if(error.iRet == 0){
            res.status(404);
        }else{
            res.status(500);
        }
        next();
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
    res.setHeader("Expires", "-1");
    res.setHeader("Cache-Control", "must-revalidate, private");
    var id = req.params.id;
    if(!id){
        res.json({iRet: 0, info: '参数错误'});
        return false;
    }

    obj.getList('comment', req, {'filter[module]': 'zhuanti', 'filter[record_id]': id, per_page: req.config.perPage.comments}).then(function(body){
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

    obj.delete('collect', id, req).then(function(body){
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
