var express = require('express');
var router = express.Router();

// 列表
router.get('/', function(req, res, next){
    res.render('topic_index', {title: '专题列表'});
});

// 详情
router.get('/detail/:id', function(req, res, next){
    res.render('topic_detail', {title: '专题详情'});
});

router.get('/list', function(req, res, next){
    res.render('topic_detail', {title: '专题列表'});
});
module.exports = router;
