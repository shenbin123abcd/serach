var express = require('express');
var router = express.Router();
var obj = require('../module/module');

// 列表
router.get(['/','/search'], function(req, res, next){
    var data={},params = {per_page: req.config.perPage.case};

    if(req.query.tag){
        params.tag = req.query.tag;
    }

    if(req.query.color){
        params.color = req.query.color;
    }

    if(req.query.sort == 1){
        // 最新
        params['order[id]'] = 'DESC';
    }else if(req.query.sort == 2){
        // 最热
        params['order[views]'] = 'DESC';
    }else if(req.query.sort == 2){
        // 最赞
        params['order[points]'] = 'DESC';
    }else{
        // 默认最新
        params['order[id]'] = 'DESC';
    }

    obj.getList('cases', req, params).then(function(body){
        if(body.iRet === 1){
            data = body.data;
            data.style=[
                '全部','中国红','玫瑰红','蜜桃粉'
            ];
            res.json(data);
            //res.render('case_index', {title: '案例列表'});
        }else{
            res.sendStatus(500);
        }
    }, function(error){
        res.sendStatus(500);
    });
});

// 详情
router.get('/detail/:id', function(req, res, next){
    var id = parseInt(req.params.id);

    if(id <= 0 || isNaN(id)){
        res.sendStatus(404);
        return ;
    }

    obj.getInfo('cases', id, req).then(function(body){
        if(body.iRet === 1){
            var data = body.data;
            data.cover = req.config.case + '/' + body.data.cover;
            return data;
        }else if(body.iRet === 0){
            res.sendStatus(404);
            return false;
        }else{
            res.sendStatus(500);
            return false;
        }
    }, function(error){
        res.sendStatus(500);
    }).then(function(data){
        // 相似案例
        data.xiangsi = [];
        return obj.getList('cases/xiangsi', req, {case_id: data.id,per_page:12}).then(function(body){console.log(1)
            if(body.iRet === 1){
                data.xiangsi = body.data;
            }
            return data;
        }, function(error){
            return data;
        });
    }).then(function(data){console.log(2222)
        // 公司其他案例
        data.other = data.other || [];
        obj.getList('cases', req, {'filter[company_id]': data.company_id,per_page:12}).then(function(body){
            if(body.iRet === 1){
                data.other = body.data.data;
            }
            res.json(data);
            //res.render('case_detail', {title: '案例详情'});
        });

    });

});

//结果
router.get('/result', function(req, res, next){
    res.render('case_result', {title: '案例搜索结果'});
});
module.exports = router;
