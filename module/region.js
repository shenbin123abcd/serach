/**
 * Created by Administrator on 2016/5/6.
 */
var obj = require('./module');
var _ = require('lodash/collection');
var config = require('../config');
var mod = {};

mod.getParent=function(req){
    var id = req.query.r || 0;
    return obj.get('region/parent/' + id,req).then(function(body){
        if (body.iRet === 1) {
            return body.data;
        }else{
            return null;
        }
    },function(res){
        return null;
    })
};

mod.getRegionLevel1Name=function(req){
    var id = req.query.r || 0;
    id = Number(id);
    return obj.get('region/parent/' + id,req).then(function(body){
        if (body.iRet === 1) {
            if(!body.data){
                if(!id){
                    return '';
                }else{
                    return _.find(config.region,{id:id}).city;
                }
            }
            if(body.data.level==1){
                return _.find(config.region,{id:body.data.id}).city;
            }else if(body.data.level==2){
                return _.find(config.region,{id:body.data.parent_id}).city;
            }else{
                return '';
            }
        }else{
            return '';
        }
    },function(res){
        return '';
    })
};

module.exports = mod;