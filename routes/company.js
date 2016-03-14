var express = require('express');
var router = express.Router();
var Handlebars = require('hbs');
// 列表
router.get('/', function(req, res, next){

    var data={};
    data.title='公司列表';
    data.region=[
        {city:"全国",id:0},
        {city:'上海',id:793},
        {city:'北京',id:2},
        {city:'江苏',id:811},
        {city:'浙江',id:925},
        {city:'天津',id:19},
        {city:'河北',id:36},
        {city:'山西',id:220},
        {city:'内蒙古',id:351},
        {city:'辽宁',id:466},
        {city:'吉林',id:581},
        {city:'黑龙江',id:651},
        {city:'安徽',id:1027},
        {city:'福建',id:1149},
        {city:'江西',id:1244},
        {city:'山东',id:1356},
        {city:'河南',id:1512},
        {city:'湖北',id:1690},
        {city:'湖南',id:1808},
        {city:'广东',id:1945},
        {city:'广西',id:2088},
        {city:'海南',id:2213},
        {city:'重庆',id:2241},
        {city:'四川',id:2280},
        {city:'贵州',id:2485},
        {city:'云南',id:2583},
        {city:'西藏',id:2729},
        {city:'陕西',id:2811},
        {city:'甘肃',id:2929},
        {city:'青海',id:3030},
        {city:'宁夏',id:3082},
        {city:'新疆',id:3110},
        {city:'台湾',id:3225},
        {city:'香港',id:3226},
        {city:'澳门',id:3227},
    ];
  res.render('company_index', {data: data});
});

// 详情
router.get('/:id', function(req, res, next){

  data={
      pageTitle:'公司详情页',
  };
  res.render('company_detail', {data: data});
});

module.exports = router;
