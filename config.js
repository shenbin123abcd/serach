/**
 * Created by wtwei on 2015/10/12.
 */
var config = {};
config.apiUrl = 'http://api.data.com';
config.JWT_SECRET = 'sdDjkGpskdjflj3289324w98#@$%^';
config.redis = {port: 6379, host: '10.0.1.85'}; // 10.0.1.85
config.NOT_CHECK_AUTH = ['', 'login', 'public'];

config.url = {
    case: 'http://7ktsyl.com2.z0.glb.qiniucdn.com',
    crmpub: 'http://7xopel.com2.z0.glb.qiniucdn.com',
    crmpri: 'http://7xopem.com2.z0.glb.qiniucdn.com'
};

config.route = function(app){
    app.use('/', require('./routes/index'));
    app.use('/case', require('./routes/case'));
    app.use('/company', require('./routes/company'));
    app.use('/picture', require('./routes/picture'));
    app.use('/topic', require('./routes/topic'));
    app.use('/api', require('./routes/api'));
};

module.exports = config;