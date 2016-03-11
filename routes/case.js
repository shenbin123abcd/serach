var express = require('express');
var router = express.Router();

// 列表
router.get('/', function(req, res, next){
    res.render('case_index', {title: '案例列表'});
});

// 详情
router.get('/detail/:id', function(req, res, next){
    res.render('case_detail', {title: '案例详情'});
});

//结果
router.get('/result', function(req, res, next){
    res.render('case_result', {title: '案例搜索结果'});
});
module.exports = router;
