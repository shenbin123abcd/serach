/**
 * Created by wtwei on 2015/10/12.
 */
var config = {};
config.apiUrl = 'http://api.data.com';
config.JWT_SECRET = 'sdDjkGpskdjflj3289324w98#@$%^';
config.redis = {port: 6379, host: '10.0.1.88', password: '123456'};
config.NOT_CHECK_AUTH = ['', 'login', 'public'];

config.url = {
    company: 'http://7ktsyl.com2.z0.glb.qiniucdn.com',
    case: 'http://7ktsyl.com2.z0.glb.qiniucdn.com',
    crmpub: 'http://7xopel.com2.z0.glb.qiniucdn.com',
    crmpri: 'http://7xopem.com2.z0.glb.qiniucdn.com',
    hotel: 'http://7xj1oh.com2.z0.glb.qiniucdn.com',
    pano: 'http://7xqd04.com2.z0.glb.qiniucdn.com'
};

config.perPage = {
    case: 60,
    picture: 60,
    company: 60,
    hotel: 30,
    topic: 12,
    comments: 9999
};

config.hotelCate = {
    1: "五星酒店",
    2: "四星酒店",
    3: "三星酒店",
    4: "婚礼会所",
    5: "特色餐厅",
    6: "游轮婚礼",
};

config.feature = {
    1: '中式',
    2: '草坪',
    3: '巴洛克',
    4: '水晶吊灯',
};


config.region = [
    {city: "全国", id: 0},
    {city: '上海', id: 793},
    {city: '北京', id: 2},
    {city: '江苏', id: 811},
    {city: '浙江', id: 925},
    {city: '天津', id: 19},
    {city: '河北', id: 36},
    {city: '山西', id: 220},
    {city: '内蒙古', id: 351},
    {city: '辽宁', id: 466},
    {city: '吉林', id: 581},
    {city: '黑龙江', id: 651},
    {city: '安徽', id: 1027},
    {city: '福建', id: 1149},
    {city: '江西', id: 1244},
    {city: '山东', id: 1356},
    {city: '河南', id: 1512},
    {city: '湖北', id: 1690},
    {city: '湖南', id: 1808},
    {city: '广东', id: 1945},
    {city: '广西', id: 2088},
    {city: '海南', id: 2213},
    {city: '重庆', id: 2241},
    {city: '四川', id: 2280},
    {city: '贵州', id: 2485},
    {city: '云南', id: 2583},
    {city: '西藏', id: 2729},
    {city: '陕西', id: 2811},
    {city: '甘肃', id: 2929},
    {city: '青海', id: 3030},
    {city: '宁夏', id: 3082},
    {city: '新疆', id: 3110},
    {city: '台湾', id: 3225},
    {city: '香港', id: 3226},
    {city: '澳门', id: 3227},
];


config.route = function (app) {
    app.use('/', require('./routes/index'));
    app.use('/case', require('./routes/case'));
    app.use('/company', require('./routes/company'));
    app.use('/picture', require('./routes/picture'));
    app.use('/topic', require('./routes/topic'));
    app.use('/hotel', require('./routes/hotel'));
    app.use('/pano', require('./routes/pano'));
    app.use('/uc', require('./routes/uc'));
    app.use('/api', require('./routes/api'));
};

module.exports = config;