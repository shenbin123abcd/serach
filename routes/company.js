var express = require('express');
var router = express.Router();
var obj = require('../module/module');

// 列表
router.get('/', function(req, res, next){
    var params = {per_page: req.config.perPage.picture, 'filter[if_show]': 1, 'filter[cate_id]': 2, page: req.query.page || 1};

    if(req.query.keywords){
        params.title = req.query.keywords;
    }

    obj.getList('company', req, params).then(function(body){
        if (body.iRet === 1) {
            var data = body.data.data;
            if (data.length > 0) {
                data.forEach(function(val, index){
                    if (val.logo.length > 0) {
                        val.logo = req.config.url.company + '/' + val.logo;
                    } else {
                        val.logo = 'img/nopic.png';
                    }
                });
            }
            /*res.json(data);*/
            data.baseUrl=req.baseUrl;
            data.absUrl=req.protocol+'://'+req.get('host')+req.originalUrl;
            data.query=req.query;
            data.keywords=req.query.keywords;
            data.title = '公司列表';
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
            data.forEach(function(n,i){
                n.cover=req.config.url.company + '/'+n.cover+"?imageView2/1/w/200/h/200"
            })
            res.render('company_index', {data: data});
        } else if (body.iRet === 0) {
            res.json({iRet: 0, info: '数据不存在', error: body.info});
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
    if(id <= 0){
        res.sendStatus(404);
        return;
    }

    obj.getInfo('company', id, req).then(function(body){
        if(body.iRet === 1){
            return body.data;

        }else if(body.iRet === 0){
            res.sendStatus(404);
        }else{
            res.sendStatus(500);
        }
    }, function(error){
        console.log(error);
        res.sendStatus(500);
    }).then(function(data){
        // 案例列表
        return obj.getList('cases', req, {'filter[if_show]': 1, company_id: data.id, pre_page: 100}).then(function(body){
            data.caseList = [];
            if(body.iRet === 1){
                body.data.data.forEach(function(n,i){
                    var obj={};
                    obj.title = n.title;
                    obj.views = n.views;
                    obj.comments = n.comments;
                    obj.points = n.points;
                    obj.cover = req.config.url.case + '/' + n.cover +"?imageView2/1/w/200/h/150";
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
        data.pageTitle = '公司详情页';
        data.cover=req.config.url.company + '/'+data.cover;
        data.company_logo=req.config.url.company + '/'+data.company_logo;
        res.render('company_detail', {data: data});
    });

});

module.exports = router;
