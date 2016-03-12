var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var data={
    pageTitle:'首页'
  }


  res.render('index', { data: data });
});

module.exports = router;
