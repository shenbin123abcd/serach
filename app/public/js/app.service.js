(function(){
    "use strict";
    app.service=(function(){
        return {
        };
    }());
}());


app.service.picture=(function(){
    "use strict";
    var haloAuth=app.index.haloAuth();

    function collect(data){
        var deferred = $.Deferred();
        var token=haloAuth.getToken();
        var header={};
        if(token){
            header.Authorization = 'Bearer ' + token;
        }
        var init=function(){
            data=data||{};
            switch (true){
                default:
                    sendXhr();
            }
        };

        var sendXhr=function(){
            $.ajax({
                method: "POST",
                url: "/picture/collect",
                headers :header,
                data: data,
                success: function(res, textStatus, errorThrown) {
                    console.log(res);
                    if(res.iRet==1){
                        deferred.resolve(res.info);
                    }else{
                        deferred.reject(res.info);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    //console.log(jqXHR, textStatus, errorThrown);
                    deferred.reject('网络繁忙请稍候再试');
                    //if(t==="timeout") {
                    //	// something went wrong (handle it)
                    //}
                }
            })
            ;

        };
        init();
        return deferred.promise();
    }

    function comment(data){
        //console.log(data)
        var deferred = $.Deferred();
        var init=function(){
            data=data||{};
            switch (true){
                case !data.username:
                    deferred.reject('请输入阁下称呼');
                    break;
                case !data.content:
                    deferred.reject('请输入祝福语');
                    break;
                default:
                    sendXhr();
            }
        };
        var sendXhr=function(){
            $.ajax({
                method: "POST",
                url: "/api/qingjian/comment/",
                //timeout: 10000,
                data: data,
                success: function(res, textStatus, errorThrown) {
                    console.log(res);
                    if(res.iRet==1){
                        deferred.resolve(res);
                    }else{
                        deferred.reject(res.info);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    //console.log(jqXHR, textStatus, errorThrown);
                    deferred.reject('网络繁忙请稍候再试');
                    //if(t==="timeout") {
                    //	// something went wrong (handle it)
                    //}
                }
            })
            ;

        };
        init();
        return deferred.promise();
    }


    return {
        comment:comment
    };
}());


