var express = require('express');
var router = express.Router();
var obj = require('../module/module');
var region = require('../module/region');
var Promise = require('bluebird');

// 列表
router.get('/', function (req, res, next) {
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

    function getInfo(){
        return obj.getList('company', req, params).then(function (body) {
            if (body.iRet === 1) {
                return body.data;
            } else {
                res.status(500);
                next();
            }
        }, function (error) {
            res.status(500);
            next();
        });
    }


    function getRegionLevel1Name(){
        return region.getRegionLevel1Name(req).then(function(res){
            return res;
        });
    }


    Promise.all([getInfo(),getRegionLevel1Name()]).then(function(result){
        var data=result[0];
        var regionLevel1Name=result[1];

        if (data.data.length > 0) {
            data.data.forEach(function (val, index) {
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
        if (req.query.keywords) {
            data.pageTitle = `
                '${req.query.keywords}' 的公司搜索结果-幻熊婚礼素材开放平台
            `;
        } else {
            data.pageTitle = `${regionLevel1Name?regionLevel1Name+' - ':''}公司列表 - 幻熊婚礼素材开放平台`;
        }
        data.totalPages = Math.ceil(data.total / data.per_page);

        data.region = req.config.region;
        data.data.forEach(function (n, i) {
            n.cover = req.config.url.company + '/' + n.cover + "?imageView2/1/w/200/h/200";
        });

        var appData = {
            total: data.total,
            per_page: data.per_page,
            totalPages: data.totalPages,
            query: data.query
        };

        res.render('company_index', {data: data, appData: appData});
    });

    //obj.getList('company', req, params).then(function (body) {
    //    if (body.iRet === 1) {
    //        var data = body.data;
    //
    //        if (data.data.length > 0) {
    //            data.data.forEach(function (val, index) {
    //                if (val.logo.length > 0) {
    //                    val.logo = req.config.url.company + '/' + val.logo + "?imageView2/1/w/200/h/150";
    //                } else {
    //                    val.logo = '/images/company-logo-sample.png';
    //                }
    //            });
    //        }
    //        //res.json(data);return;
    //        data.baseUrl = req.baseUrl;
    //        data.absUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    //        data.query = req.query;
    //        data.keywords = req.query.keywords;
    //        if (req.query.keywords) {
    //            data.pageTitle = `
    //            '${req.query.keywords}' 的公司搜索结果-幻熊婚礼素材开放平台
    //        `;
    //        } else {
    //            data.pageTitle = '公司列表 - 幻熊婚礼素材开放平台';
    //        }
    //        data.totalPages = Math.ceil(data.total / data.per_page);
    //
    //        data.region = req.config.region;
    //        data.data.forEach(function (n, i) {
    //            n.cover = req.config.url.company + '/' + n.cover + "?imageView2/1/w/200/h/200";
    //        });
    //
    //        var appData = {
    //            total: data.total,
    //            per_page: data.per_page,
    //            totalPages: data.totalPages,
    //            query: data.query
    //        };
    //
    //        res.render('company_index', {data: data, appData: appData});
    //    } else {
    //        res.status(500);
    //        next();
    //    }
    //}, function (error) {
    //    res.status(500);
    //    next();
    //});
});

// 详情
router.get('/detail/:id', function (req, res, next) {
    var id = parseInt(req.params.id);
    if (id <= 0) {
        res.status(404);
        next();
        return;
    }

    obj.getInfo('company', id, req, {cate_id: 2}).then(function (body) {
        return body.data;
    }).then(function (data) {
        // 案例列表
        return obj.getList('cases', req, {
            'filter[if_show]': 1,
            'filter[company_id]': data.id,
            per_page: 200
        }).then(function (body) {
            data.caseList = [];
            if (body.iRet === 1) {
                body.data.data.forEach(function (n, i) {
                    var obj = {};
                    obj.title = n.title;
                    obj.views = n.views;
                    obj.comments = n.comments;
                    obj.points = n.points;
                    if (n.cover == 'halo/') {
                        obj.cover = req.config.url.case + '/' + '404.png' + "?imageView2/1/w/285/h/180";
                    } else {
                        obj.cover = req.config.url.case + '/' + n.cover + "?imageView2/1/w/285/h/180";
                    }
                    obj.id = n.id;
                    data.caseList.push(obj);
                });

            }

            return data;
        }, function (error) {
            return data;
        });
    }).then(function (data) {
        /* res.json(data);*/
        data.baseUrl = req.baseUrl;

        data.absUrl=req.protocol+'://'+req.get('host')+req.originalUrl;

        data.pageTitle = data.name + ' - 公司信息 - 幻熊婚礼素材开放平台';

        data.websiteLink = data.website.indexOf('http') > -1 ? data.website : ('http://' + data.website);

        data.weibo_site_pc=data.weibo_site.replace('m.weibo.cn','weibo.com');

        data.weibo_site_pc = data.weibo_site_pc.indexOf('http') > -1 ? data.weibo_site_pc : ('http://' + data.weibo_site_pc);

        data.cover = req.config.url.company + '/' + (data.cover || '404.png') + '!company.top';

        data.company_logo = req.config.url.company + '/' + (data.company_logo || '404.png') + '?imageView2/1/w/140/h/140';
        res.render('company_detail', {data: data});
    }).catch(function(error){
        if(error.iRet == 0){
            res.status(404);
        }else{
            res.status(500);
        }
        next();
    });

});

module.exports = router;
