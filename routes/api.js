/**
 * Created by wtwei on 2015/11/17.
 */
var express = require('express');
var router = express.Router();
//var api = require('../module/api');
var token = require('../module/token');
//var obj = require('../module/module');

router.get('/checkLogin', token.verifyToken, function(req, res){
    req.json({iRet: 1, info: 'success'});
});

module.exports = router;