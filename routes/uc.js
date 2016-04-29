/**
 * Created by Administrator on 2016/4/14.
 */
var express = require('express');
var router = express.Router();
var token = require('../module/token');
var obj = require('../module/module');
var _ = require('lodash/object');
// 列表
router.get('/', function(req, res, next){
    var data={};
    data.pageTitle='个人中心 - 幻熊婚礼素材开放平台';
    data.baseUrl = req.baseUrl;
    res.render('uc', {data:data});
});

// 我的信息
router.get('/info', token.verifyToken, function(req, res, next){
    res.setHeader("Expires", "-1");
    res.setHeader("Cache-Control", "must-revalidate, private");
    //var data = {
    //    iRet: 1,
    //    info: "success",
    //    data:{
    //        avatar: "http://7kttnj.com2.z0.glb.qiniucdn.com/avatar/9cc376d79e8e1f6fb84707a2686167f1!middle",
    //        id: 2724,
    //        phone: "13917601042",
    //        sid: 0,
    //        uid: 2724,
    //        username: "ewfrew",
    //    }
    //};
    //res.json(data);
    obj.getInfo('user',req.user.id ,req, {}).then(function(body){

        if (body.iRet === 1) {
            var data =_.pick(body.data, ['avatar', 'phone','sid','username']);
            res.json({iRet: 1, info: 'success', data: data});
            //return data;
            // res.render('topic_index', {title: '专题列表'});
        } else {
            res.sendStatus(500);
        }
    }, function(error){
        console.log(error);
        res.sendStatus(500);
    });
    //res.render('uc', {data:data});
});

// 我的收藏
router.get('/collects', token.verifyToken, function(req, res, next){
    res.setHeader("Expires", "-1");
    res.setHeader("Cache-Control", "must-revalidate, private");

    var params={
        'filter[uid]':req.user.id,
        'filter[module]':req.query.module,
        'per_page':1000,
    };
    obj.getList('collect', req, params).then(function(body){

        body.data.data.forEach(function(n,i){
            n.cover = req.config.url.case + '/' + n.cover +"?imageView2/1/w/200/h/150"
        });
        res.json(body);

    }, function(error){
        console.log(error);
        res.sendStatus(500);
    });
    //res.render('uc', {data:data});
});

// 我的评论
router.get('/comments', token.verifyToken, function(req, res, next){
    res.setHeader("Expires", "-1");
    res.setHeader("Cache-Control", "must-revalidate, private");
    var params={
        //'filter[uid]':req.user.id,
        //'filter[module]':req.query.module,
        'per_page':1000,
    };


    switch (req.query.owner){
        case 'user':
            params["filter[uid]"]=req.user.id;
            break;
        case 'company':
            params["filter[company_id]"]=req.user.company_id;
            break;
    }

    obj.getList('comment', req, params).then(function(body){

        body.data.data.forEach(function(n,i){
            n.cover = req.config.url.case + '/' + n.cover +"?imageView2/1/w/110/h/81"
        });
        res.json(body);

    }, function(error){
        console.log(error);
        res.sendStatus(500);
    });
    //res.render('uc', {data:data});
});

// 删除评论
router.delete('/comment/:id', token.verifyToken, function(req, res, next){


    obj.delete('comment',req.params.id, req).then(function(body){
        if(body.iRet==1){
            body.info="操作成功";
            res.json(body);
        }else{
            res.json(body);
        }
    }, function(error){
        console.log(error);
        res.sendStatus(500);
    });

});



module.exports = router;
