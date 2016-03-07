var express = require('express');
var router = express.Router();

// 列表
router.get('/', function(req, res, next){
  res.render('company_index', {title: '公司列表'});
});

// 详情
router.get('/:id', function(req, res, next){
  res.render('company_detail', {title: '公司详情'});
});

module.exports = router;
