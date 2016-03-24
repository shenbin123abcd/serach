var express = require('express');
var router = express.Router();
var obj = require('../module/module');

// 列表
router.get('/', function(req, res, next){
    var params = {
        per_page: req.config.perPage.picture,
        'filter[if_show]': 1,
        'filter[cate_id]': 2,
        page: req.query.page || 1
    };
    var r = req.query.r || 0;

    if (req.query.keywords) {
        params.name = req.query.keywords;
    }

    if (!isNaN(r) && r > 0 && r < 3228) {
        params.region_id = req.query.r;
    }

    obj.getList('company', req, params).then(function(body){
        if (body.iRet === 1) {
            var data = body.data;

            if (data.data.length > 0) {
                data.data.forEach(function(val, index){
                    if (val.logo.length > 0) {
                        val.logo = req.config.url.company + '/' + val.logo + "?imageView2/1/w/200/h/150";
                    } else {
                        val.logo = '/images/company-logo-sample.png';
                    }
                });
            }
            //res.json(data);return;
            data.baseUrl = req.baseUrl;
            data.absUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
            data.query = req.query;
            data.keywords = req.query.keywords;
            data.title = '公司列表';
            data.totalPages = Math.ceil(data.total / data.per_page);

            data.region = [
                {city: "全国", id: 0},
                {city: '上海', id: 793},
                {city: '北京', id: 2},
                {city: '江苏', id: 811},
                {city: '浙江', id: 925},
                {city: '天津', id: 19},
                {city: '河北', id: 36},
                {city: '山西', id: 220},
                {city: '内蒙古', id: 351},
                {city: '辽宁', id: 466},
                {city: '吉林', id: 581},
                {city: '黑龙江', id: 651},
                {city: '安徽', id: 1027},
                {city: '福建', id: 1149},
                {city: '江西', id: 1244},
                {city: '山东', id: 1356},
                {city: '河南', id: 1512},
                {city: '湖北', id: 1690},
                {city: '湖南', id: 1808},
                {city: '广东', id: 1945},
                {city: '广西', id: 2088},
                {city: '海南', id: 2213},
                {city: '重庆', id: 2241},
                {city: '四川', id: 2280},
                {city: '贵州', id: 2485},
                {city: '云南', id: 2583},
                {city: '西藏', id: 2729},
                {city: '陕西', id: 2811},
                {city: '甘肃', id: 2929},
                {city: '青海', id: 3030},
                {city: '宁夏', id: 3082},
                {city: '新疆', id: 3110},
                {city: '台湾', id: 3225},
                {city: '香港', id: 3226},
                {city: '澳门', id: 3227},
            ];
            data.data.forEach(function(n, i){
                n.cover = req.config.url.company + '/' + n.cover + "?imageView2/1/w/200/h/200";
            });

            var appData = {
                total: data.total,
                per_page: data.per_page,
                totalPages: data.totalPages,
                query: data.query,
            };

            res.render('company_index', {data: data,appData:appData});
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
    if (id <= 0) {
        res.sendStatus(404);
        return;
    }

    obj.getInfo('company', id, req, {cate_id: 2}).then(function(body){
        if (body.iRet === 1) {
            return body.data;

        } else if (body.iRet === 0) {
            res.sendStatus(404);
        } else {
            res.sendStatus(500);
        }
    }, function(error){
        console.log(error);
        res.sendStatus(500);
    }).then(function(data){
        // 案例列表
        return obj.getList('cases', req, {
            'filter[if_show]': 1,
            'filter[company_id]': data.id,
            per_page: 200
        }).then(function(body){
            data.caseList = [];
            if (body.iRet === 1) {
                body.data.data.forEach(function(n, i){
                    var obj = {};
                    obj.title = n.title;
                    obj.views = n.views;
                    obj.comments = n.comments;
                    obj.points = n.points;
                    if(n.cover=='halo/'){
                        obj.cover = req.config.url.case + '/' +'404.png' + "?imageView2/1/w/200/h/150";
                    }else{
                        obj.cover = req.config.url.case + '/' + n.cover + "?imageView2/1/w/200/h/150";
                    }
                    obj.id = n.id;
                    data.caseList.push(obj);
                });

            }

            return data;
        }, function(error){
            return data;
        });
    }).then(function(data){
        /* res.json(data);*/
        data.pageTitle = data.name + '公司信息';

        data.cover = req.config.url.company + '/' + (data.cover||'404.png') + '?imageMogr2/blur/6x8/gravity/center/crop/920x450';

        data.company_logo = req.config.url.company + '/' + (data.company_logo||'404.png') + '?imageView2/1/w/100/h/75';
        res.render('company_detail', {data: data});
    });

});

module.exports = router;
