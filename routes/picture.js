var express = require('express');
var url = require('url');
var router = express.Router();
var obj = require('../module/module');
var token = require('../module/token');
var _ = require('lodash/collection');


// 首页，列表，搜索
router.get(['/'], function (req, res, next) {
    var data = {};
    var params = {per_page: req.config.perPage.picture, 'filter[if_show]': 1};

    if (req.query.tag) {
        params.tag = req.query.tag;
    }

    if (req.query.color) {
        params.color = req.query.color;
    }

    if (req.query.sort == 1) {
        // 最新
        params['order[id]'] = 'DESC';
    } else if (req.query.sort == 2) {
        // 最热
        params['order[views]'] = 'DESC';
    } else if (req.query.sort == 3) {
        // 最赞
        params['order[points]'] = 'DESC';
    } else {
        // 默认最新
        params['order[id]'] = 'DESC';
    }

    obj.getList('picture/tag', req, params).then(function (body) {
        if (body.iRet === 1) {
            data = body.data;

            data.data.forEach((n, i)=> {
                n.path = req.config.url.case + '/' + n.path + '?imageView2/1/w/200/h/150';
            });

            data.baseUrl = req.baseUrl;
            data.absUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
            data.query = req.query;

            var urlObj = url.parse(data.absUrl);
            data.route = urlObj.pathname.replace(req.baseUrl, '');


            data.tag = req.query.tag;
            data.sort = req.query.sort;

            if (req.query.tag) {
                data.pageTitle = `
                '${req.query.tag}' 的图片搜索结果-幻熊婚礼素材开放平台
            `;
            } else {
                data.pageTitle = '图片 - 幻熊婚礼素材开放平台';
            }

            data.element = ['全部', '剪影', '蝴蝶', '春天', '城堡', '白云', '星星', '菱形', '三角', '雪花', '樱花', '卡通', '纱幔', '泡雕', '纸花', '蜡烛', '蜡烛', '明场',
                '灯珠', '渐变', '撞色', '爱心', '气球', '飞屋', '棉花', '蕾丝', '花墙', '龙柳', '拱门', '树木', '镜面', '木桩', '垂挂', '架构', '水晶', '喷水池', '满天星', '向日葵',
                'LED屏', '地排花', '星空幕布', '长桌装饰', '翻糖蛋糕'
            ];
            data.classify = [
                '新娘捧花', '婚礼桌花', '婚礼路引', '婚礼车花', '舞台背景', '拍照背景', '迎宾区域', '迎宾牌示', '席位图示', '椅背装饰', '仪式门亭', '签到台饰',
                '甜品蛋糕', '婚礼喜糖', '婚礼请柬', '餐桌布置', '新郎胸花', '婚礼灯光', '新娘婚纱', '新娘头纱', '伴娘礼服', '妆面造型', '发型配饰', '新郎服饰',
                '新娘婚鞋', '婚戒首饰', '手工捧花', '新娘腕花', '桌卡设计'
            ];


            switch (true) {
                case _.includes(data.element, req.query.tag):
                    data.isMatchTag = true;
                    data.activeTab = 'element';
                    break;
                case _.includes(data.classify, req.query.tag):
                    data.isMatchTag = true;
                    data.activeTab = 'classify';
                    break;
                default:
                    data.isMatchTag = false;
                    data.activeTab = 'element';
                    break;
            }
            data.totalPages = Math.ceil(data.total / data.per_page);

            var appData = {
                total: data.total,
                per_page: data.per_page,
                totalPages: data.totalPages,
                query: data.query,
            };


            //res.json(data);
            res.render('picture_index_and_search', {data: data,appData:appData});
        } else {
            res.sendStatus(500);
        }
    }, function (error) {
        res.sendStatus(500);
    });

});

// 详情
router.get('/detail/:id', function (req, res, next) {
    var id = parseInt(req.params.id);

    if (id <= 0 || isNaN(id)) {
        res.status(404);
        next();
        return;
    }
    var start = new Date().getTime();
    obj.getInfo('picture/tag', id, req).then(function (body) {
        console.log('pic-info',body.time, new Date().getTime() - start);
        return body.data;
    }).then(function (data) {
        // 相似图片
        data.xiangsi = [];
        return obj.getList('picture/xiangsi', req, {picture_id: data.id, per_page: 12}).then(function (body) {
            console.log('pic-xs',body.time, new Date().getTime() - start);
            if (body.iRet === 1) {
                data.xiangsi = body.data;
            }
            return data;
        }, function (error) {
            return data;
        });
    }).then(function (data) {
        // 案例其他图片
        data.case = [];
        return obj.getList('picture/tag', req, {'filter[case_id]': data.case_id, per_page: 50}).then(function (body) {
            console.log('pic-other',body.time, new Date().getTime() - start);
            if (body.iRet === 1) {
                data.case = body.data;
            }
            return data;
        }, function (error) {
            return data;
        });
    }).then(function (data) {
        // 图片所属公司
        data.company = {};
        return obj.getInfo('company', data.company_id, req).then(function (body) {
            console.log('pic-company',body.time, new Date().getTime() - start);
            if (body.iRet === 1) {
                data.company = {
                    id: body.data.id,
                    name: body.data.name,
                    cases: body.data.cases,
                    logo: body.data.company_logo
                };
            }
            return data;
        }, function (error) {
            return data;
        });
    }).then(function (data) {
        //res.json(data);

        data.baseUrl = req.baseUrl;
        data.absUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        data.query = req.query;

        var urlObj = url.parse(data.absUrl);
        data.route = urlObj.pathname.replace(req.baseUrl, '');


        data.pageTitle = `热门图片 - ${data.tag} - 幻熊婚礼素材开放平台`;
        data.path = `${req.config.url.case}/${data.path}?imageView2/2/w/902/`;
        if (data.company.id) {
            data.company.logo = `${req.config.url.case}/${data.company.logo}?imageView2/1/w/160/h/120`;
        }

        data.colorArr = data.other_color ? data.other_color.split(',') : [];

        data.tagArr = data.tag ? data.tag.split(',') : [];


        data.case.data.forEach((n, i)=> {
            n.path = `${req.config.url.case}/${n.path}?imageView2/1/w/145/h/107`;
        });
        data.xiangsi.forEach((n, i)=> {
            n.path = `${req.config.url.case}/${n.path}?imageView2/1/w/145/h/107`;
        });

        var appData = {
            id: data.id,
            query: data.query,
        };


        res.render('picture_detail', {data: data,appData:appData});
    }).catch(function(error){
        if(error.iRet == 0){
            res.status(404);
        }else{
            res.status(500);
        }
        next();
    });
});

// 新增评论
router.post('/comment', token.verifyToken, function (req, res, next) {
    var data = req.body;

    if (!data.content) {
        res.json({iRet: 0, info: '评论内容不能为空'});
    }
    data.module = 'picture';
    data.uid = req.user.id;
    data.username = req.user.username;
    obj.add('comment', data, req).then(function (body) {
        if (body.iRet === 1) {
            res.json({iRet: 1, info: '评论成功'});
        } else if (body.iRet === 0) {
            res.json({iRet: 0, info: '网络繁忙，请稍候再试', error: body.info});
        } else {
            res.sendStatus(500);
        }
    }, function (error) {
        res.sendStatus(500);
    });
});

// 获取评论列表
router.get('/comment/:id', function (req, res) {
    var id = req.params.id;
    if (!id) {
        res.json({iRet: 0, info: '参数错误'});
        return false;
    }

    obj.getList('comment', req, {
        module: 'picture',
        record_id: id,
        per_page: req.config.perPage.comments
    }).then(function (body) {
        if (body.iRet === 1) {
            res.json({iRet: 1, info: 'success', data: body.data});
        } else {
            res.json({iRet: 0, info: '网络繁忙，请稍候再试', error: body.info});
        }
    }, function (error) {
        res.json(500, {iRet: 0, info: '网络繁忙，请稍候再试', error: error});
    });
});

// 收藏
router.post('/collect', token.verifyToken, function (req, res, next) {
    var data = req.body;

    if (!data.record_id) {
        res.json({iRet: 0, info: '参数错误'});
    }
    data.module = 'picture';
    data.uid = req.user.id;
    obj.add('collect', data, req).then(function (body) {
        if (body.iRet === 1) {
            res.json({iRet: 1, info: '收藏成功'});
        } else if (body.iRet === 0) {
            res.json({iRet: 0, info: '网络繁忙，请稍候再试', error: body.info});
        } else {
            res.sendStatus(500);
        }
    }, function (error) {
        res.sendStatus(500);
    });
});

// 取消收藏
router.delete('/collect/:id', token.verifyToken, function (req, res, next) {
    var id = req.params.id;

    if (!id) {
        res.json({iRet: 0, info: '参数错误'});
    }

    obj.delete('collect', id, req).then(function (body) {
        if (body.iRet === 1) {
            res.json({iRet: 1, info: '操作成功'});
        } else if (body.iRet === 0) {
            res.json({iRet: 0, info: '网络繁忙，请稍候再试', error: body.info});
        } else {
            res.sendStatus(500);
        }
    }, function (error) {
        res.sendStatus(500);
    });
});

module.exports = router;
