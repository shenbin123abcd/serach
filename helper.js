var url = require('url');
var helper = {};


helper.ellipsis = function(){
    return 'ellipsis';
};
helper.search = function(query, partQuery, removeQuery){

    function toStr(params){
        var str = [];
        for (var p in params) {
            str.push(p + "=" + encodeURIComponent(params[p]));
        }
        return str.join("&");
    }

    function add(newParams, removeParams){
        var removeParams = removeParams || [];
        removeParams = [].concat(removeParams);
        var params = query;
        var paramsAfterRemove = {};

        if (removeParams.length > 0) {
            var paramsKeys = [];
            for (var p in params) {
                paramsKeys.push(p);
            }

            removeParams.forEach(function(n, i){
                var isMatch;
                paramsKeys.forEach(function(k, j){
                    if (k == n) {
                        isMatch = true;
                        return
                    }
                });
                if (!isMatch && params[n]) {

                    paramsAfterRemove[n] = params[n];
                }
            });
        } else {
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

    var str = add(partQuery, removeQuery);
    //var str=add(partQuery,['tag','color']);

    return str;
};

helper.hexToRgb = function(hex, isString, isReverse){
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b){
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!isString) {
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    } else {

        if (!isReverse) {
            return result ? `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)})`
                : null;
        } else {
            switch (hex){
                case '#f30909':
                    return '#b21755';
                    break;
                case '#f126a2':
                    return '#9b1b8d';
                    break;
                case '#fd82b6':
                    return '#b05a7f';
                    break;
                case '#ff8522':
                    return '#b96019';
                    break;
                case '#fff669':
                    return '#beb74e';
                    break;


                case '#84d634':
                    return '#66a628';
                    break;
                case '#008b00':
                    return '#005f00';
                    break;
                case '#75dceb':
                    return '#498a93';
                    break;
                case '#7dc6ff':
                    return '#5c91bb';
                    break;
                case '#014efd':
                    return '#012e94';
                    break;


                case '#e291fc':
                    return '#8d5a9d';
                    break;
                case '#b808d8':
                    return '#7c0591';
                    break;
                case '#a26516':
                    return '#6f450f';
                    break;
                case '#ffd700':
                    return '#a38900';
                    break;
                case '#f7d5b3':
                    return '#a08a74';
                    break;


                case '#cfcfcf':
                    return '#7e7e7e';
                    break;
                case '#ffffff':
                    return '#a9aa9c';
                    break;
                case '#000000':
                    return '#ffffff';
                    break;

                case '#2797ff':
                    return '#1960a2';
                    break;



            }



            //if(parseInt(result[1], 16)+parseInt(result[2], 16)+parseInt(result[3], 16)>384){
            //    return result ? `rgb(255,255,255)`
            //        : null;
            //}else{
            //    return result ? `rgb(255,255,255)`
            //        : null;
            //}


        }
    }

};

helper.arrayShuffle = function(arr, length, tag_length){

helper.viewNumber=function(n){
    if(n>9999){
        return n/1000+'k';
    }else{
        return n;
    }

};

helper.arrayShuffle = function(arr, length){

    arr.sort(function(){
        return 0.5 - Math.random();
    });
    var temp = [];
    if(length && length > 0){
        temp = arr.slice(0, length);
    }

    if(tag_length){
        return [temp, arr.slice(length, tag_length + length)];
    }else{
        return temp;
    }
};


module.exports = helper;