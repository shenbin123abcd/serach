var express = require('express');
var router = express.Router();
var obj = require('../module/module');

/* GET home page. */
router.get('/', function(req, res, next){
    // 最新案例
    var data = {};
    var params = {per_page: 13, group: 'company_id'};
    obj.getList('cases', req, params).then(function(body){
        if(body.iRet === 1){
            data.case_new = body.data.data;
            return data;
        }else{
            res.sendStatus(500);
        }
    }, function(error){
        res.sendStatus(500);
    }).then(function(data){
        // 精选专题
        params.per_page = 6;
        return obj.getList('zhuanti', req, params).then(function(body){
            if(body.iRet === 1){
                data.zhuanti = body.data.data;
                return data;
            }else{
                res.sendStatus(500);
            }
        })
    }).then(function(data){
        // 精选案例
        params.per_page = 12;
        params['filter[recommended]'] = 1;
        return obj.getList('cases', req, params).then(function(body){
            if(body.iRet === 1){
                data.case_recommend = body.data.data;
                return data;
            }else{
                res.sendStatus(500);
            }
        })
    }).then(function(data){
        // 图片
        params.per_page = 12;
        return obj.getList('picture/tag', req, params).then(function(body){
            if(body.iRet === 1){
                data.image = body.data.data;
                return data;
            }else{
                res.sendStatus(500);
            }
        })
    }).then(function(data){
        // 公司
        params.per_page = 12;
        params['filter[cate_id]'] = 2;
        return obj.getList('company', req, params).then(function(body){
            if(body.iRet === 1){
                data.company = body.data.data;
                return data;
            }else{
                res.sendStatus(500);
            }
        })
    }).then(function(data){
        data.case_new.forEach(function(n,i){
            n.cover = req.config.url.case + '/' + n.cover
        })
        data.case_new[0].cover=data.case_new[0].cover+"?imageView2/1/w/400/h/300";
        data.case_new[1].cover=data.case_new[1].cover+"?imageView2/1/w/400/h/300";
        data.case_new[2].cover=data.case_new[2].cover+"?imageView2/1/w/200/h/300";
        for(var i=3;i<13;i++){
            data.case_new[i].cover=data.case_new[i].cover+"?imageView2/1/w/200/h/150";
        }
        data.case_recommend.forEach(function(n,i){
            n.cover=req.config.url.case+n.cover+"?imageView2/1/w/200/h/300"
        })
        data.zhuanti.forEach(function(n,i){
            n.default_image=req.config.url.case+n.default_image+"?imageView2/1/w/200/h/300"
        })
        data.baseUrl=req.baseUrl;
        //res.json(data);
        res.render('index', {data: data});
    });


});

module.exports = router;
