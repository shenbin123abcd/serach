(function(){
    "use strict";
    app.service=(function(){
        var haloAuth=app.index.haloAuth();

        function checkLogin(data){
            var deferred = $.Deferred();
            var token=haloAuth.getToken();
            //console.log(token)
            var header={};
            if(token){
                header.Authorization = 'Bearer ' + token;
            }
            function init(){
                data=data||{};
                switch (true){
                    default:
                        sendXhr();
                }
            };
            function sendXhr(){
                $.ajax({
                    method: "GET",
                    url: "/api/checkLogin",
                    headers :header,
                    data: data,
                    success: function(res, textStatus, errorThrown) {
                        //console.log(res);
                        if(res.iRet==1){
                            deferred.resolve(res.info);
                        }else{
                            deferred.reject(res.info);
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        var res=jqXHR.responseJSON;
                        //console.log(res);
                        //console.log(jqXHR);
                        if(res.iRet==-1){
                            deferred.reject(res);
                        }else{
                            deferred.reject('网络繁忙请稍候再试');
                        }
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
            checkLogin:checkLogin,
        };
    }());
}());


app.service.picture=(function(){
    "use strict";
    var haloAuth=app.index.haloAuth();

    function collect(data){
        var deferred = $.Deferred();
        var token=haloAuth.getToken();
        //console.log(token)
        var header={};
        if(token){
            header.Authorization = 'Bearer ' + token;
        }
        function init(){
            data=data||{};
            switch (true){
                default:
                    sendXhr();
            }
        };
        function sendXhr(){
            $.ajax({
                method: "POST",
                url: "/picture/collect",
                headers :header,
                data: data,
                success: function(res, textStatus, errorThrown) {
                    //console.log(res);
                    if(res.iRet==1){
                        deferred.resolve(res.info);
                    }else{
                        deferred.reject(res.info);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(res);
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
    function unCollect(data){
        var deferred = $.Deferred();
        var token=haloAuth.getToken();
        //console.log(token)
        var header={};
        if(token){
            header.Authorization = 'Bearer ' + token;
        }
        function init(){
            data=data||{};
            switch (true){
                default:
                    sendXhr();
            }
        };
        function sendXhr(){
            $.ajax({
                method: "DELETE",
                url: "/picture/collect/"+data.id,
                headers :header,
                data: data,
                success: function(res, textStatus, errorThrown) {
                    //console.log(res);
                    if(res.iRet==1){
                        deferred.resolve(res.info);
                    }else{
                        deferred.reject(res.info);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(res);
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
        var deferred = $.Deferred();
        var token=haloAuth.getToken();
        //console.log(token)
        var header={};
        if(token){
            header.Authorization = 'Bearer ' + token;
        }
        function init(){
            data=data||{};
            switch (true){
                case !data.content:
                    deferred.reject('请输入评论内容');
                    break;
                default:
                    sendXhr();
            }
        };
        function sendXhr(){
            $.ajax({
                method: "POST",
                url: "/picture/comment",
                headers :header,
                data: data,
                success: function(res, textStatus, errorThrown) {
                    //console.log(res);
                    if(res.iRet==1){
                        deferred.resolve(res.info);
                    }else{
                        deferred.reject(res.info);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    //deferred.reject('网络繁忙请稍候再试');
                    var res=jqXHR.responseJSON;
                    console.log(res);
                    if(res.iRet==-1){
                        deferred.reject(res);
                    }else{
                        deferred.reject('网络繁忙请稍候再试');
                    }
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

    function getComments(data){
        var deferred = $.Deferred();
        function init(){
            data=data||{};
            switch (true){
                default:
                    sendXhr();
            }
        };
        function sendXhr(){

            $.ajax({
                method: "GET",
                url: "/picture/comment/"+data.id,
                data: {},
                success: function(res, textStatus, errorThrown) {
                    console.log(res);
                    if(res.iRet==1){
                        deferred.resolve(res.data);
                    }else{
                        deferred.reject(res.info);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(res);
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
        comment:comment,
        collect:collect,
        unCollect:unCollect,
        getComments:getComments,
    };
}());


