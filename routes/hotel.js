var express = require('express');
var url = require('url');
var router = express.Router();
var obj = require('../module/module');
var token = require('../module/token');
var _ = require('lodash/collection');

// 列表
router.get('/', function (req, res, next) {
    var params = {
        per_page: req.config.perPage.hotel,
        // 'filter[if_show]': 1,
        page: req.query.page || 1
    };
    var r = req.query.r || 0;

    if (req.query.keywords) {
        params.name = req.query.keywords;
    }

    if (!isNaN(r) && r > 0 && r < 3228) {
        params.region_id = req.query.r;
    }

    obj.getList('hotel', req, params).then(function (body) {
        if (body.iRet === 1) {
            var data = body.data;



            //res.json(data);return;
            data.baseUrl = req.baseUrl;
            data.absUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
            data.query = req.query;
            data.keywords = req.query.keywords;
            data.title = '酒店列表 - 幻熊婚礼素材开放平台';
            data.totalPages = Math.ceil(data.total / data.per_page);

            data.region = req.config.region;
            data.properties = [
                {
                    name:"星级",
                    query:"cate",
                    vals:['全部','五星级','四星级','三星级','特色会所'],
                },
                {
                    name:"特色",
                    query:"feature",
                    vals:['全部','中式','草坪','巴洛克','水晶吊灯'],
                },
            ];

            if(data.query.cate||data.query.feature){
                data.activeTab = 'properties';
            }else{
                data.activeTab = 'r';
            }



            data.data.forEach(function (n, i) {
                n.c_cover = `${req.config.url.hotel}/${n.cover||'404.png'}!thumb5`;
                n.c_cate=req.config.hotelCate[n.cate_id];
            });

            var appData = {
                total: data.total,
                per_page: data.per_page,
                totalPages: data.totalPages,
                query: data.query
            };

            res.render('hotel_index_and_search', {data: data, appData: appData});
        } else {
            res.status(500);
            next();
        }
    }, function (error) {
        res.status(500);
        next();
    });
});

// 详情
router.get('/detail/:id', function (req, res, next) {
    var data={};
    data.baseUrl = req.baseUrl;
    res.render('hotel_detail',{data:data});

});


module.exports = router;
