var express = require('express');
var url = require('url');
var router = express.Router();

// 列表
router.get(['/','/search'], function(req, res, next){
    data={};
    data.urlObj=url.parse(req.originalUrl);
    data.route=data.urlObj.pathname.replace(req.baseUrl,'');
    data.pageTitle='搜索引擎_幻熊科技 - 更智慧的婚礼业';


    if(data.route=='/search'){
        data.isSearch=true;
    }
    data.element=['全部','剪影','蝴蝶','春天','城堡','白云','星星','菱形','三角','雪花','樱花','卡通','纱幔','泡雕','纸花','蜡烛','蜡烛','明场',
        '灯珠','渐变','撞色','爱心','气球','飞屋','棉花','蕾丝','花墙','龙柳','拱门','树木','镜面','木桩','垂挂','架构','水晶','喷水池','满天星','向日葵',
        'LED屏','地排花','星空幕布','长桌装饰','翻糖蛋糕'
    ];
    data.classify=[
        '新娘捧花','婚礼桌花','婚礼路引','婚礼车花','舞台背景','拍照背景','迎宾区域','迎宾牌示','席位图示','椅背装饰','仪式门亭','签到台饰',
        '甜品蛋糕','婚礼喜糖','婚礼请柬','餐桌布置','新郎胸花','婚礼灯光','新娘婚纱','新娘头纱','伴娘礼服','妆面造型','发型配饰','新郎服饰',
        '新娘婚鞋','婚戒首饰','手工捧花','新娘腕花','桌卡设计'
    ]
    res.render('picture_index_and_search', {data: data});
});

// 详情
router.get('/detail/:id', function(req, res, next){
  res.render('picture_detail', {title: '图片详情'});
});


//结果
router.get('/se', function(req, res, next){

    res.render('picture_result', {title: '图片搜索结果'});
});

module.exports = router;
