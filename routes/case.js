var express = require('express');
var url = require("url");
var router = express.Router();
var obj = require('../module/module');
var token = require('../module/token');
var _ = require('lodash');

// 列表
router.get(['/'], function(req, res, next){
    var data={},params = {per_page: req.config.perPage.case, 'filter[if_show]': 1};

    if(req.query.tag){
        params.tag = req.query.tag;
    }

    if(req.query.color){
        params.color = req.query.color;
    }

    if(req.query.sort == 1){
        // 最新
        params['order[id]'] = 'DESC';
    }else if(req.query.sort == 2){
        // 最热
        params['order[views]'] = 'DESC';
    }else if(req.query.sort == 2){
        // 最赞
        params['order[points]'] = 'DESC';
    }else{
        // 默认最新
        params['order[id]'] = 'DESC';
    }

    obj.getList('cases', req, params).then(function(body){
        if(body.iRet === 1){
            data = body.data;

            data.baseUrl=req.baseUrl;
            data.absUrl=req.protocol+'://'+req.get('host')+req.originalUrl;
            data.query=req.query;
            var urlObj=url.parse(data.absUrl);
            data.route=urlObj.pathname.replace(req.baseUrl,'');
            data.tag=req.query.tag;
            data.sort=req.query.sort;
            if(data.route=='/search'){
                data.pageTitle=`“${req.query.tag}”的图片搜索结果-图片搜索`;
            }else{
                data.pageTitle="案例首页";
            }
            data.listColor=[
                '全部','中国红','玫瑰红','蜜桃粉','活力橙','樱草黄','青草绿','香槟金','月石灰','摩卡黑','祖母绿','蒂芙尼',
                '天空蓝','宝石蓝','丁香紫','高贵紫','咖啡棕','藕荷粉','象牙白'
            ];
            data.listStyle=[
                '全部','童话','波普','欧式','怀旧','青春','英伦','法式','乡村','户外','唯美','淡雅','撞色','生日','时尚',
                '几何','线条','糖果','冰雪','神秘','教堂','唐韵','汉代','星空','派对','海外','可爱','复古','森系','奢华',
                '梦幻','草坪','花园','海滩','水彩','水彩','水彩','卡通','游戏','清新','宝宝','宫廷','韩式','Party','公主风',
                '婚礼式','新中式','东南亚','地中海','地中海','洛可可','民族风','异域风'
            ];
            data.caseList=[];

            data.data.forEach(function(n,i){
                var obj={};
                obj.title = data.data[i].title;
                obj.company = data.data[i].company;
                obj.cover = req.config.url.case + '/' + data.data[i].cover +"?imageView2/1/w/200/h/150";
                obj.id = data.data[i].id;
                obj.company_id=data.data[i].company_id;
                obj.views=data.data[i].views;
                obj.points=data.data[i].points;
                obj.comments=data.data[i].comments;
                data.caseList.push(obj);
            });
            switch(true){
                case _.includes(data.listColor, req.query.tag):
                    data.isMatchTag=true;
                    data.activeTab='listColor';
                    break;
                case _.includes(data.listStyle, req.query.tag):
                    data.isMatchTag=true
                    data.activeTab='listStyle';
                    break;
                default:
                    data.isMatchTag=false;
                    data.activeTab='listColor';
                    break;
            }
            data.totalPages=Math.ceil(data.total/data.per_page);
            /*res.json(data);*/
            res.render('case_index_and_search', {data:data});
        }else{
            res.sendStatus(500);
        }
    }, function(error){
        res.sendStatus(500);
    });
});

// 详情
router.get('/detail/:id', function(req, res, next){
    var id = parseInt(req.params.id);

    if(id <= 0 || isNaN(id)){
        res.sendStatus(404);
        return ;
    }

    obj.getInfo('cases', id, req).then(function(body){
        if(body.iRet === 1){
            return body.data;
        }else if(body.iRet === 0){
            res.sendStatus(404);
            return false;
        }else{
            res.sendStatus(500);
            return false;
        }
    }, function(error){
        res.sendStatus(500);
    }).then(function(data){
        // 相似案例
        data.xiangsi = [];
        return obj.getList('cases/xiangsi', req, {case_id: data.id,per_page:12}).then(function(body){console.log(1)
            if(body.iRet === 1){
                data.xiangsi = body.data;

            }
            return data;
        }, function(error){
            return data;
        });
    }).then(function(data){console.log(2222)
        // 公司其他案例
        data.other = data.other || [];
        return obj.getList('cases', req, {'filter[company_id]': data.company_id,per_page:12}).then(function(body){
            if(body.iRet === 1){
                data.other = body.data.data;
            }
            return data

        });

    }).then(function(data){

        data.baseUrl=req.baseUrl;
        data.pageTitle = "案例详情";
        data.cover = req.config.url.case + '/' + data.cover +"?imageView2/1/w/900/h/600";
        data.attachArr=[];
        data.attach.forEach(function(n,i){
            data.attachArr[i]= req.config.url.case + '/' + data.attach[i].path +"?imageView2/1/w/900/h/600";
        });
        data.colorArr=data.other_color.split(",");
        data.tagArr=data.tag.split(",");
        data.xiangsiImg=[];
        data.otherImg=[];
        data.xiangsi.forEach(function(n,i){
            data.xiangsiImg[i]= req.config.url.case + '/' + data.xiangsi[i].cover +"?imageView2/1/w/100/h/70";
        });
        data.other.forEach(function(n,i){
            data.otherImg[i]= req.config.url.case + '/' + data.other[i].cover +"?imageView2/1/w/100/h/70";
        });
        res.render('case_detail', {data: data});
    });

});


// 新增评论
router.post('/comment',token.verifyToken, function(req, res, next){
    var data = req.body;

    if (!data.content || data.record_id){
        res.json({iRet: 0, info: '参数错误'});
    }
    data.module = 'case';
    obj.add('comment', data, req).then(function(body){
        if(body.iRet === 1){
            res.json({iRet: 1, info: '评论成功'});
        }else if(body.iRet === 0){
            res.json({iRet: 0, info: '网络繁忙，请稍候再试', error: body.info});
        }else{
            res.sendStatus(500);
        }
    }, function(error){
        res.sendStatus(500);
    });
});

// 获取评论列表
router.get('/comment/:id', function(req, res){
    var id = req.params.id;
    if(!id){
        res.json({iRet: 0, info: '参数错误'});
        return false;
    }

    obj.getList('comment', req, {module: 'case', record_id: id, per_page: req.config.perPage.comments}).then(function(body){
        if(body.iRet === 1){
            res.json({iRet: 1, info: '评论成功', data: body.data});
        }else{
            res.json({iRet: 0, info: '网络繁忙，请稍候再试', error: body.info});
        }
    }, function(error){
        res.json(500,{iRet: 0, info: '网络繁忙，请稍候再试', error: error});
    });
});


// 收藏
router.post('/collect',token.verifyToken, function(req, res, next){
    var data = req.body;

    if (!data.record_id){
        res.json({iRet: 0, info: '参数错误'});
    }
    data.module = 'case';
    obj.add('collect', data, req).then(function(body){
        if(body.iRet === 1){
            res.json({iRet: 1, info: '收藏成功'});
        }else if(body.iRet === 0){
            res.json({iRet: 0, info: '网络繁忙，请稍候再试', error: body.info});
        }else{
            res.sendStatus(500);
        }
    }, function(error){
        res.sendStatus(500);
    });
});

// 取消收藏
router.delete('/collect/:id',token.verifyToken, function(req, res, next){
    var id = req.params.id;

    if (!id){
        res.json({iRet: 0, info: '参数错误'});
    }

    obj.delete('collect', id, req).then(function(body){
        if(body.iRet === 1){
            res.json({iRet: 1, info: '操作成功'});
        }else if(body.iRet === 0){
            res.json({iRet: 0, info: '网络繁忙，请稍候再试', error: body.info});
        }else{
            res.sendStatus(500);
        }
    }, function(error){
        res.sendStatus(500);
    });
});

module.exports = router;
