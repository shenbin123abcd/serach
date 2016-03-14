var express = require('express');
var url = require('url');
var router = express.Router();

// 列表
router.get(['/','/search'], function(req, res, next){
    data={};
    data.urlObj=url.parse(req.originalUrl);
    data.route=data.urlObj.pathname.replace(req.baseUrl,'');
    data.pageTitle='搜索引擎_幻熊科技 - 更智慧的婚礼业';
    data.v0=0;
    data.v1=1;
    data.v2=2;
    if(data.route=='/search'){
        data.isSearch=true;
    }


    res.render('picture_index', {data: data});
});

// 详情
router.get('/detail/:id', function(req, res, next){
  res.render('picture_detail', {title: '图片详情'});
});


//结果
router.get('/se', function(req, res, next){

    res.render('picture_result', {title: '图片搜索结果'});
});

module.exports = router;
