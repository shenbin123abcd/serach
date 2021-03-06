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
        function getStaticData(){
            var deferred = $.Deferred();
            sendXhr();
            function sendXhr(){
                $.ajax({
                    method: "GET",
                    url: "/api/total",
                    data: {},
                    success: function(res, textStatus, errorThrown) {
                        //console.log(res);
                        if(res.iRet==1){
                            deferred.resolve(res.data);
                        }else{
                            deferred.reject(res.info);
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        //var res=jqXHR.responseJSON;
                        //console.log(res);
                        //console.log(jqXHR);
                        //if(res.iRet==-1){
                        //    deferred.reject(res);
                        //}else{
                        deferred.reject('网络繁忙请稍候再试');
                        //}
                    }
                })
                ;

            };
            return deferred.promise();


        }
        function getChildrenRegion(data){

            var deferred = $.Deferred();
            var data=data||{};
            sendXhr();
            function sendXhr(){
                $.ajax({
                    method: "GET",
                    url: "/api/region",
                    data: data,
                    success: function(res, textStatus, errorThrown) {
                        //console.log(res);
                        if(res.iRet==1){
                            deferred.resolve(res.data);
                        }else{
                            deferred.reject(res.info);
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        //var res=jqXHR.responseJSON;
                        //console.log(res);
                        //console.log(jqXHR);
                        //if(res.iRet==-1){
                        //    deferred.reject(res);
                        //}else{
                        deferred.reject('网络繁忙请稍候再试');
                        //}
                    }
                })
                ;

            };
            return deferred.promise();


        }
        function getParentRegion(data){
            var deferred = $.Deferred();
            var data=data||{};
            sendXhr();
            function sendXhr(){
                $.ajax({
                    method: "GET",
                    url: "/api/region/parent",
                    data: data,
                    success: function(res, textStatus, errorThrown) {
                        //console.log(res);
                        if(res.iRet==1){
                            deferred.resolve(res.data);
                        }else{
                            deferred.reject(res.info);
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        //var res=jqXHR.responseJSON;
                        //console.log(res);
                        //console.log(jqXHR);
                        //if(res.iRet==-1){
                        //    deferred.reject(res);
                        //}else{
                        deferred.reject('网络繁忙请稍候再试');
                        //}
                    }
                })
                ;

            };
            return deferred.promise();
        }
        function getSiblingsRegion(data){
            var deferred = $.Deferred();
            var data=data||{};
            sendXhr();
            function sendXhr(){
                $.ajax({
                    method: "GET",
                    url: "/api/region/siblings",
                    data: data,
                    success: function(res, textStatus, errorThrown) {
                        //console.log(res);
                        if(res.iRet==1){
                            deferred.resolve(res.data);
                        }else{
                            deferred.reject(res.info);
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        //var res=jqXHR.responseJSON;
                        //console.log(res);
                        //console.log(jqXHR);
                        //if(res.iRet==-1){
                        //    deferred.reject(res);
                        //}else{
                        deferred.reject('网络繁忙请稍候再试');
                        //}
                    }
                })
                ;

            };
            return deferred.promise();
        }



        return {
            checkLogin:checkLogin,
            getStaticData:getStaticData,
            getChildrenRegion:getChildrenRegion,
            getParentRegion:getParentRegion,
            getSiblingsRegion:getSiblingsRegion,
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
                    var res=jqXHR.responseJSON;
                    if(res.iRet==-1){
                        deferred.reject(res);
                    }else{
                        deferred.reject('网络繁忙请稍候再试');
                    }
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
                    var res=jqXHR.responseJSON;
                    if(res.iRet==-1){
                        deferred.reject(res);
                    }else{
                        deferred.reject('网络繁忙请稍候再试');
                    }
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
                case hb.validation.isEmpty(data.content):
                    deferred.reject('请输入具体评论内容');
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
        var options={
            method: "GET",
            url: "/picture/comment/"+data.id,
            data: {},
            success: function(res, textStatus, errorThrown) {
                //console.log(res);
                if(res.iRet==1){
                    deferred.resolve(res.data);
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
        };
        if (Modernizr.ie) {
            options.cache=false;
        }
        function init(){
            data=data||{};
            switch (true){
                default:
                    sendXhr();
            }
        }

        function sendXhr(){
            $.ajax(options);
        }
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

app.service.case=(function(){
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
                url: "/case/collect",
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
                    //console.log(jqXHR, textStatus, errorThrown);
                    var res=jqXHR.responseJSON;
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
                url: "/case/collect/"+data.id,
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
                    if(res.iRet==-1){
                        deferred.reject(res);
                    }else{
                        deferred.reject('网络繁忙请稍候再试');
                    }
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
                case hb.validation.isEmpty(data.content):
                    deferred.reject('请输入具体评论内容');
                    break;
                default:
                    sendXhr();
            }
        };
        function sendXhr(){
            $.ajax({
                method: "POST",
                url: "/case/comment",
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
        var options={
            method: "GET",
            url: "/case/comment/"+data.id,
            data: {},
            success: function(res, textStatus, errorThrown) {
                //console.log(res);
                if(res.iRet==1){
                    deferred.resolve(res.data);
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
        };
        if (Modernizr.ie) {
            options.cache=false;
        }
        function init(){
            data=data||{};
            switch (true){
                default:
                    sendXhr();
            }
        }

        function sendXhr(){
            $.ajax(options);
        }
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
app.service.topic=(function(){
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
                url: "/topic/collect",
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
                    if(res.iRet==-1){
                        deferred.reject(res);
                    }else{
                        deferred.reject('网络繁忙请稍候再试');
                    }
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
                url: "/topic/collect/"+data.id,
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
                    if(res.iRet==-1){
                        deferred.reject(res);
                    }else{
                        deferred.reject('网络繁忙请稍候再试');
                    }
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
                case hb.validation.isEmpty(data.content):
                    deferred.reject('请输入具体评论内容');
                    break;
                default:
                    sendXhr();
            }
        };
        function sendXhr(){
            $.ajax({
                method: "POST",
                url: "/topic/comment",
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
        var options={
            method: "GET",
            url: "/topic/comment/"+data.id,
            data: {},
            success: function(res, textStatus, errorThrown) {
                //console.log(res);
                if(res.iRet==1){
                    deferred.resolve(res.data);
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
        };
        if (Modernizr.ie) {
            options.cache=false;
        }
        function init(){
            data=data||{};
            switch (true){
                default:
                    sendXhr();
            }
        }

        function sendXhr(){
            $.ajax(options);
        }
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


