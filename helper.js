var url = require('url');
var helper = {};


helper.ellipsis = function() {
    return 'ellipsis';
};
helper.search = function(query,partQuery,removeQuery) {

    function toStr(params){
        var str = [];
        for(var p in params) {
            str.push(p + "=" + encodeURIComponent(params[p]));
        }
        return str.join("&");
    }

    function add(newParams,removeParams) {
        var removeParams=removeParams||[];
        removeParams=[].concat(removeParams);
        var params = query;
        var paramsAfterRemove = {};

        if(removeParams.length>0){
            var paramsKeys=[];
            for (var p in params) {
                paramsKeys.push(p);
            }

            removeParams.forEach(function(n,i){
                var isMatch;
                paramsKeys.forEach(function(k,j){
                    if(k==n){
                        isMatch=true;
                        return
                    }
                });
                if(!isMatch){
                    paramsAfterRemove[n] = params[n];
                }
            });
        }else{
            for (var p in params) {
                paramsAfterRemove[p] = params[p];
            }
        }


        for (var p in newParams) {
            //params[p] = newParams[p];
            paramsAfterRemove[p] = newParams[p];
        }
        //toHash(params);
        //console.log(paramsAfterRemove);
        return toStr(paramsAfterRemove);
    }

    var str=add(partQuery,removeQuery);
    //var str=add(partQuery,['tag','color']);

    return str;
};

helper.hexToRgb=function (hex,isString,isReverse) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if(!isString){
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }else{
        if(!isReverse){
            return result ? `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)})`
                : null;
        }else{
            return result ? `rgb(${255-parseInt(result[1], 16)},${255-parseInt(result[2], 16)},${255-parseInt(result[3], 16)})`
                : null;
        }
    }

};


module.exports = helper;