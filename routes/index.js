var express = require('express');
var router = express.Router();
//var Handlebars = require('hbs');

/* GET home page. */
router.get('/', function(req, res, next) {

  var data={
    pageTitle:'首页',
    list:[],
  };

  for(var i= 1;i<=24;i++){
      data.list.push({});
  }



  res.render('index', { data: data });
});

module.exports = router;
