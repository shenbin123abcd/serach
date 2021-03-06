var express = require('express');
var url = require('url');
var router = express.Router();
var obj = require('../module/module');
var region = require('../module/region');
var token = require('../module/token');
var _ = require('lodash/collection');
var Promise = require('bluebird');

// 列表
router.get('/', function(req, res, next){
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

    if (req.query.c) {
        params['cate_id'] = req.query.c;
    }
    function getList(){
        return obj.getList('hotel', req, params).then(function(body){
            if (body.iRet === 1) {
                return body.data;

            } else {
                res.status(500);
                next();
            }
        }, function(error){
            res.status(500);
            next();
        });
    }

    function getRegionLevel1Name(){
        return region.getRegionLevel1Name(req).then(function(res){
            return res;
        });
    }

    function getNum(){
        return obj.get('hotel/totalNum', req, {}).then(function(body){
            return body;
        });
    }

    Promise.all([getList(), getRegionLevel1Name(), getNum()]).then(function(result){

        var data = result[0];
        var regionLevel1Name = result[1];
        data.hotelNum = result[2];
        //res.json(data);return;
        data.baseUrl = req.baseUrl;
        data.absUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        data.query = req.query;
        data.keywords = req.query.keywords;
        if (req.query.keywords) {
            data.pageTitle = `
                '${req.query.keywords}' 的酒店搜索结果-幻熊婚礼素材开放平台`;
        } else {
            data.pageTitle = `${regionLevel1Name ? regionLevel1Name + ' - ' : ''}酒店列表 - 幻熊婚礼素材开放平台`;
        }
        data.totalPages = Math.ceil(data.total / data.per_page);

        data.region = req.config.region;
        data.properties = [
            {
                name: "星级",
                query: "c",
                vals: req.config.hotelCate,
            },
            //{
            //    name:"特色",
            //    query:"f",
            //    vals:req.config.feature,
            //},
        ];

        if (data.query.c || data.query.f) {
            data.activeTab = 'properties';
        } else {
            data.activeTab = 'r';
        }

        data.data.forEach(function(n, i){
            if (n.cover.length > 0) {
                n.c_cover = `${req.config.url.hotel}/${n.cover}!thumb5`;
            } else {
                n.c_cover = req.config.url.company + '/' + '404.png' + "?imageView2/1/w/244/h/183";
            }

            n.c_cate = req.config.hotelCate[n.cate_id];
            if (_.includes(req.config.region, data.query)) {
                n.c_region_name = n.region_name
            } else {
                n.c_region_name = n.region_name
            }
        });

        var appData = {
            total: data.total,
            per_page: data.per_page,
            totalPages: data.totalPages,
            query: data.query
        };

        res.render('hotel_index_and_search', {data: data, appData: appData});
    })
});

// 详情
router.get('/detail/:id', token.getUser, function(req, res, next){
    var id = parseInt(req.params.id);

    if (id <= 0 || isNaN(id)) {
        res.status(404);
        next();
        return;
    }

    // 酒店详情
    function getInfo(){
        return obj.getInfo('hotel', id, req).then(function(body){
            return body.data;
        });
    }

    function getHallList(){
        return obj.getList('hotelHall', req, {hotel: id, detail: 1}).then(function(body){
            return body.data;
        });
    }

    Promise.all([getInfo(), getHallList()]).then(function(result){
        var data = result[0], hall = result[1], hall_format = {};
        data.baseUrl = req.baseUrl;
        data.absUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        data.query = req.query;
        if (data.cover) {
            data.cover = req.config.url.hotel + '/' + (data.cover) + '!opencover';
        } else {
            data.cover = req.config.url.company + '/' + '404.png' + "?imageView2/1/w/320/h/200";
        }

        if (data.name) {
            data.pageTitle = data.name + ' - 酒店详情 - 幻熊婚礼素材开放平台';
        } else {
            data.pageTitle = '酒店详情 - 幻熊婚礼素材开放平台';
        }

        // 格式化厅列表
        var is_auth = (req.user && req.user.priv && req.config.panoGroup.indexOf(req.user.priv.privs) != -1) ? 1 : 0;
        hall.forEach(function(val, index){
            if (val.cover.length > 0) {
                val.cover = req.config.url.hotel + '/' + val.cover + '!thumb8';
            } else {
                val.cover = req.config.url.company + '/' + '404.png' + "?imageView2/1/w/147/h/93";
            }
            val.thumb = [];
            val.attach.forEach(function(val2, index2){
                hall[index].attach[index2].image_url = req.config.url.hotel + '/' + val2.file_path + '!thumb6';
                hall[index].thumb[index2] = req.config.url.hotel + '/' + val2.file_path + '!thumb7';
            });
            
            // 是否有查看全景的权限

            if (val.has_pano && is_auth) {
                val.pano_url = "http://open.halobear.com/pano/index.html?hotel=" + val.hotel_id + "&hall=" + val.id;
            } else {
                val.pano_url = "";
            }

            // 内景
            if (val.indoor_hall == 0) {
                hall_format[val.id] = {in: val, out: {}};
            }

        });

        // 对应的外景
        for (var val in hall_format) {
            hall.forEach(function(val2, index2){
                if (val == val2.indoor_hall) {
                    hall_format[val].out = val2;
                }
            });
        }

        var temp_hall = _.map(hall_format, function(val, key){
            return val;
        });
        //res.json(data);
        //res.json(temp_hall);
        res.render('hotel_detail', {data: data, hall: temp_hall});
    }).catch(function(error){
        if (error.iRet == 0) {
            res.status(404);
        } else {
            res.status(500);
        }
        next();
    });
});


module.exports = router;
