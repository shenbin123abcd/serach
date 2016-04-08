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
        //per_page: 5,
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
            if (req.query.keywords) {
                data.pageTitle = `
                '${req.query.keywords}' 的酒店搜索结果-幻熊婚礼素材开放平台
            `;
            } else {
                data.pageTitle = '酒店列表 - 幻熊婚礼素材开放平台';
            }
            data.totalPages = Math.ceil(data.total / data.per_page);

            data.region = req.config.region;
            data.properties = [
                {
                    name:"星级",
                    query:"c",
                    vals:req.config.hotelCate,
                },
                {
                    name:"特色",
                    query:"f",
                    vals:req.config.feature,
                },
            ];

            if(data.query.c||data.query.f){
                data.activeTab = 'properties';
            }else{
                data.activeTab = 'r';
            }



            data.data.forEach(function (n, i) {
                n.c_cover = `${req.config.url.hotel}/${n.cover||'404.png'}!thumb5`;
                n.c_cate=req.config.hotelCate[n.cate_id];
                if(_.includes(req.config.region, data.query)){
                    n.c_region_name=n.region_name
                }else{
                    n.c_region_name=n.region_name
                }
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
