var express = require('express');
var router = express.Router();

// 列表
router.get('/', function(req, res, next){
    res.render('topic_index', {title: '专题列表'});
});

// 详情
router.get('/:id', function(req, res, next){
    res.render('topic_detail', {title: '专题详情'});
});

module.exports = router;
