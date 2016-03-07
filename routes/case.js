var express = require('express');
var router = express.Router();

// 列表
router.get('/', function(req, res, next){
    res.render('case_index', {title: '案例列表'});
});

// 详情
router.get('/:id', function(req, res, next){
    res.render('case_detail', {title: '案例详情'});
});

module.exports = router;
