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
            removeParams.forEach(function(n,i){
                for (var p in params) {
                    if(n!=p){
                        paramsAfterRemove[p] = params[p];
                    }
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

    return str;
};




module.exports = helper;