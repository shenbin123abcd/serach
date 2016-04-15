/**
 * Created by Administrator on 2016/4/14.
 */
var express = require('express');
var router = express.Router();
var token = require('../module/token');
var obj = require('../module/module');
// 列表
router.get('/', function(req, res, next){
    var data={};
    data.pageTitle='个人中心 - 幻熊婚礼素材开放平台';
    data.baseUrl = req.baseUrl;
    res.render('uc', {data:data});
});

// 我的收藏
router.get('/collect', token.verifyToken, function(req, res, next){

    var params={
        'filter[uid]':req.user.id,
        'filter[module]':'picture',
    };
    obj.getList('collect', req, params).then(function(body){
        res.json(body);
        //if (body.iRet === 1) {
        //    var data = body.data;
        //
        //
        //    //return data;
        //    // res.render('topic_index', {title: '专题列表'});
        //} else {
        //    res.sendStatus(500);
        //}
    }, function(error){
        console.log(error);
        res.sendStatus(500);
    });
    //res.render('uc', {data:data});
});



module.exports = router;
