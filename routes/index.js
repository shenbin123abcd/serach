var express = require('express');
var router = express.Router();
var obj = require('../module/module');
var helper = require('../helper');

/* GET home page. */
router.get('/', function(req, res, next){
    // req.redis.clear('search_index_data');
    req.redis.get('search_index_data').then(function(data){
        if (!data) {
            getData(req, res);
        } else {
            console.log('cache');
            render(JSON.parse(data), req, res);
        }
    }, function(err){
        res.sendStatus(500);
    });
});

function getData(req, res){
    var params = {per_page: 100, group: 'company_id'}, data = {};
    // 最新案例
    obj.getList('cases', req, params).then(function(body){
        if (body.iRet === 1) {
            data.case_new = helper.arrayShuffle(body.data.data, 13);
            return data;
        } else {
            res.sendStatus(500);
        }
    }, function(error){
        res.sendStatus(500);
    }).then(function(data){
        // 精选案例
        // params.per_page = 24;
        params['filter[recommended]'] = 1;
        return obj.getList('cases', req, params).then(function(body){
            if (body.iRet === 1) {
                data.case_recommend = helper.arrayShuffle(body.data.data, 24);
                return data;
            } else {
                res.sendStatus(500);
            }
        })
    }).then(function(data){
        // 图片
        // params.per_page = 24;
        params.recommended = 1;
        return obj.getList('picture/tag', req, params).then(function(body){
            delete params.recommended;
            if (body.iRet === 1) {
                data.image = helper.arrayShuffle(body.data.data, 24);
                return data;
            } else {
                res.sendStatus(500);
            }
        })
    }).then(function(data){
        // 公司
        // params.per_page = 24;
        params['filter[cate_id]'] = 2;
        return obj.getList('company', req, params).then(function(body){
            if (body.iRet === 1) {
                data.company = helper.arrayShuffle(body.data.data, 24);
                return data;
            } else {
                res.sendStatus(500);
            }
        })
    }).then(function(data){
        // 精选专题
        params.per_page = 12;
        params['order[sort]'] = 'DESC';
        delete params['filter[recommended]'];
        delete params['filter[cate_id]'];
        return obj.getList('zhuanti', req, params).then(function(body){
            if (body.iRet === 1) {
                data.zhuanti = body.data.data;
                return data;
            } else {
                res.sendStatus(500);
            }
        })
    }).then(function(data){
        req.redis.set('search_index_data', JSON.stringify(data), 3600);

        render(data, req, res);
    });
}

function render(data, req, res){
    data.case_new.forEach(function(n, i){
        n.cover = req.config.url.case + '/' + n.cover
    })
    data.case_new[0].cover = data.case_new[0].cover + "?imageView2/1/w/420/h/300";
    data.case_new[1].cover = data.case_new[1].cover + "?imageView2/1/w/420/h/300";
    data.case_new[2].cover = data.case_new[2].cover + "?imageView2/1/w/200/h/300";
    for (var i = 3; i < 13; i++) {
        data.case_new[i].cover = data.case_new[i].cover + "?imageView2/1/w/200/h/150";
    }
    data.case_recommend.forEach(function(n, i){
        n.cover = req.config.url.case + '/' + n.cover + "?imageView2/1/w/200/h/150"
    });
    data.zhuanti.forEach(function(n, i){
        n.default_image = req.config.url.case + '/' + n.default_image + "?imageView2/1/w/420/h/226"
    });
    data.image.forEach(function(n, i){
        n.path = req.config.url.case + '/' + n.path + "?imageView2/1/w/200/h/150"
    });
    data.company.forEach(function(n, i){
        n.logo = req.config.url.company + '/' + n.logo + "?imageView2/1/w/200/h/150"
    });
    data.baseUrl = req.baseUrl;
    data.pageTitle = '搜索引擎-首页';
    //res.json(data);
    res.render('index', {data: data});
}

module.exports = router;
