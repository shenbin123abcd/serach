var express = require('express');
var router = express.Router();
var obj = require('../module/module');
var helper = require('../helper');

/* GET home page. */
router.get('/', function(req, res, next){
    req.redis.clear('search_index_data');
    req.start_time = new Date().getTime();
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
    var Promise = require('bluebird');
    var params = {per_page: 100, group: 'company_id'};

    // 精选案例 最新案例
    function cases(){
        var params = {per_page: 100, group: 'company_id', 'filter[recommended]': 1};
        return obj.getList('cases', req, params).then(function(body){
            if (body.iRet === 1) {
                var cases = helper.arrayShuffle(body.data.data, 20, 13);
                return {case_recommend: cases[0], case_new: cases[1]};
            } else {
                return {case_recommend: [], case_new: []};
            }
        })
    }

    // 精选图片
    function picture(){
        var params = {per_page: 100, group: 'company_id', recommended: 1};

        return obj.getList('picture/tag', req, params).then(function(body){
            if (body.iRet === 1) {
                return helper.arrayShuffle(body.data.data, 20);
            } else {
                return [];
            }
        })
    }

    // 推荐公司
    function company(){
        var params = {per_page: 100, group: 'company_id', recommended: 1, 'filter[cate_id]': 2};

        return obj.getList('company', req, params).then(function(body){
            if (body.iRet === 1) {
                return helper.arrayShuffle(body.data.data, 24);
            } else {
                return [];
            }
        })
    }

    function zhuanti(){
        var params = {per_page: 12, group: 'company_id', 'order[sort]': 'DESC'};

        return obj.getList('zhuanti', req, params).then(function(body){
            if (body.iRet === 1) {
                return body.data.data;
            } else {
                return [];
            }
        })
    }

    Promise.all([cases(), picture(), company(), zhuanti()]).then(function(result){
        var data = {};
        data.case_new = result[0].case_new;
        data.case_recommend = result[0].case_recommend;
        data.image = result[1];
        data.company = result[2];
        data.zhuanti = result[3];

        data.case_new.forEach(function(n, i){
            if (n.color == "") {
                n.color = "#2797ff";
            } else if (n.color == "#ffffff") {
                n.fontColor = "#333";
            } else {
                n.fontColor = "#ffffff";
            }
            if (i < 2) {
                n.cover = req.config.url.case + '/' + n.cover + "?imageView2/1/w/520/h/390";
            } else if (i == 2) {
                n.cover = req.config.url.case + '/' + n.cover + "?imageView2/1/w/249/h/384";
            } else if (i == 7 || i == 12) {
                n.cover = req.config.url.case + '/' + n.cover + "?imageView2/1/w/300/h/225";
            } else {
                n.cover = req.config.url.case + '/' + n.cover + "?imageView2/1/w/300/h/225";
            }
        });

        data.case_recommend.forEach(function(n, i){
            n.cover = req.config.url.case + '/' + n.cover + "?imageView2/1/w/310/h/232"
        });
        data.zhuanti.forEach(function(n, i){
            n.default_image = req.config.url.case + '/' + n.default_image + "?imageView2/1/w/420/h/226"
        });
        data.image.forEach(function(n, i){
            n.path = req.config.url.case + '/' + n.path + "?imageView2/1/w/310/h/232"
        });
        data.company.forEach(function(n, i){
            n.logo = req.config.url.company + '/' + n.logo + "?imageView2/1/w/200/h/150"
        });
        data.baseUrl = req.baseUrl;

        data.absUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

        data.pageTitle = '幻熊婚礼素材开放平台-首页';

        req.redis.set('search_index_data', JSON.stringify(data), 10800);
        var t = new Date().getTime() - req.start_time;
        console.log('=============',t);
        render(data, req, res);
    });
}

function getData1(req, res){
    var params = {per_page: 100, group: 'company_id'}, data = {};
    // 最新案例
    // 精选案例
    // params.per_page = 24;
    params['filter[recommended]'] = 1;
    obj.getList('cases', req, params).then(function(body){
        if (body.iRet === 1) {
            var cases = helper.arrayShuffle(body.data.data, 20, 13);
            data.case_recommend = cases[0];
            data.case_new = cases[1];
            return data;
        } else {
            res.sendStatus(500);
        }
    }).then(function(data){
        // 图片
        // params.per_page = 24;
        params.recommended = 1;
        return obj.getList('picture/tag', req, params).then(function(body){
            delete params.recommended;
            if (body.iRet === 1) {
                data.image = helper.arrayShuffle(body.data.data, 20);
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
        data.case_new.forEach(function(n, i){
            if (n.color == "") {
                n.color = "#2797ff";
            } else if (n.color == "#ffffff") {
                n.fontColor = "#333";
            } else {
                n.fontColor = "#ffffff";
            }
            if (i < 2) {
                n.cover = req.config.url.case + '/' + n.cover + "?imageView2/1/w/520/h/390";
            } else if (i == 2) {
                n.cover = req.config.url.case + '/' + n.cover + "?imageView2/1/w/249/h/384";
            } else if (i == 7 || i == 12) {
                n.cover = req.config.url.case + '/' + n.cover + "?imageView2/1/w/300/h/225";
            } else {
                n.cover = req.config.url.case + '/' + n.cover + "?imageView2/1/w/300/h/225";
            }
        });

        data.case_recommend.forEach(function(n, i){
            n.cover = req.config.url.case + '/' + n.cover + "?imageView2/1/w/310/h/232"
        });
        data.zhuanti.forEach(function(n, i){
            n.default_image = req.config.url.case + '/' + n.default_image + "?imageView2/1/w/420/h/226"
        });
        data.image.forEach(function(n, i){
            n.path = req.config.url.case + '/' + n.path + "?imageView2/1/w/310/h/232"
        });
        data.company.forEach(function(n, i){
            n.logo = req.config.url.company + '/' + n.logo + "?imageView2/1/w/200/h/150"
        });
        data.baseUrl = req.baseUrl;

        data.absUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

        data.pageTitle = '幻熊婚礼素材开放平台-首页';

        req.redis.set('search_index_data', JSON.stringify(data), 10800);

        render(data, req, res);
    });
}

function render(data, req, res){

    res.render('index', {data: data});
}

module.exports = router;
