/**
 * Created by Administrator on 2016/4/14.
 */
var express = require('express');
var router = express.Router();

// 列表
router.get('/', function(req, res, next){
    var data={};
    data.pageTitle='个人中心 - 幻熊婚礼素材开放平台';
    data.baseUrl = req.baseUrl;
    res.render('uc', {data:data});
});

module.exports = router;
