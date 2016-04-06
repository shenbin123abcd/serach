var express = require('express');
var url = require('url');
var router = express.Router();
var obj = require('../module/module');
var token = require('../module/token');
var _ = require('lodash/collection');



// 详情
router.get('/detail/:id', function (req, res, next) {
    var data={};
    data.baseUrl = req.baseUrl;
    res.render('hotel_detail',{data:data});

});


module.exports = router;
