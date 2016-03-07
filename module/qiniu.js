/**
 * Created by wtwei on 2015/11/27.
 */
var qiniu = require('qiniu');
var config = require('../config');

qiniu.conf.ACCESS_KEY = '1TdNMD7iQZodk1T4iAYz62dIUzkShGw7IKczFwde';
qiniu.conf.SECRET_KEY = 'tiy4aE3uj391TbEO7hHXNTnJRp9StaRlAjf-kWn1';


function privateUrl(key){
    console.log(key);
    console.log('================',key.substr(1));
    var baseUrl = qiniu.rs.makeBaseUrl('7xopem.com2.z0.glb.qiniucdn.com', key);// config.baichuan.crmpri
    var policy = new qiniu.rs.GetPolicy();
    return policy.makeRequest(baseUrl);
}

module.exports.privateUrl = privateUrl;