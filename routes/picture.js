var express = require('express');
var router = express.Router();

// 列表
router.get('/', function(req, res, next){
  res.render('picture_index', {title: '图片列表'});
});

// 详情
router.get('/:id', function(req, res, next){
  res.render('picture_detail', {title: '图片详情'});
});

module.exports = router;
