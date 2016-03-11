var express = require('express');
var router = express.Router();

// 列表
router.get('/', function(req, res, next){
  res.render('picture_index', {title: '图片列表'});
});

// 详情
router.get('/detail/:id', function(req, res, next){
  res.render('picture_detail', {title: '图片详情'});
});

//结果
router.get('/result', function(req, res, next){
    res.render('picture_result', {title: '图片搜索结果'});
});

module.exports = router;
