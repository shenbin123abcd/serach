app.index=(function(){
    "use strict";



    function topicEllipsis(){
        //console.log($('#topic-list').find("[topic-des]"))
        $('#topic-list').find("[topic-des]").ellipsis();
    }
    function resizeLogo(){

        app.common.resizeLogo("#company-list img",150);


    }

    return {
        lazy: function() {
            //console.log($("img.lazy"))
            $("img.lazy").lazyload({
                placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURfDw8Lu/XasAAAAKSURBVAjXY2AAAAACAAHiIbwzAAAAAElFTkSuQmCC",
                effect: "fadeIn",
                failure_limit : 100,
                threshold: 200,
            });
        },
        nav: function() {
            $('.nav-menu-icon a').on('click', function() {
                if ($('nav').hasClass('slide-menu')) {
                    $('nav').removeClass('slide-menu');
                    $(this).removeClass('active');
                } else {
                    $('nav').addClass('slide-menu');
                    $(this).addClass('active');
                }
                return false;
            });

            if ($(window).width() < 992) {
                $('.open-drop').on('click', function() {
                    if ($(this).parent().parent().find('.dropmenu').hasClass('active')) {
                        $(this).removeClass('active');
                        $(this).parent().parent().find('.dropmenu').removeClass('active');
                    } else {
                        $(this).addClass('active');
                        $('.dropmenu').removeClass('active');
                        $(this).parent().parent().find('.dropmenu').addClass('active');
                    }
                    return false;
                });
            }
        },
        indexInit:function(){
            var DIALOG=window.app.index.DIALOG;
            var haloAuth=window.app.index.haloAuth();
            var token=haloAuth.getToken();
            var user=haloAuth.getUser();
            //var token=window.localStorage.getItem('token');
            //var user=JSON.parse(window.localStorage.getItem("user"));
            if(token){
                $("[nav-before-login]").hide();
                $("[nav-after-login]").show();
                $('#nav-login-btn-hidden').text(user.username);
            }else{
                $("[nav-before-login]").show();
                $("[nav-after-login]").hide();
            }

            $("#nav-login-btn-logout").on('click',function(){
                haloAuth.clear();
                $("[nav-before-login]").show();
                $("[nav-after-login]").hide();
                $('#nav-login-btn-hidden').text('');
                if(hb.location.url('path').indexOf('/uc')>-1){
                    window.location.href='/';
                }

            });
        },
        register:function(){
            var userService=window.app.index.userService();
            var DIALOG=window.app.index.DIALOG;
            var haloValidation=hb.validation;
            $('#register-modal').on('show.bs.modal', function(){
                $('#register-modal').off('hidden.bs.modal',afterGetRegCode)
            });
            function afterGetRegCode(){
                $('#zc-modal').modal("show");
            };
            $("#register_phone").on("input",function(){
                var num = parseInt($(this).val().length);
                if(num===11){
                    $("#send_btn").css("color",'#fff').css("background",'#e74c3c');
                }else if(num>11){
                    DIALOG.error("请输入正确的手机号");
                    $(this).val("");
                    $("#send_btn").css("color",'#fff').css("background",'#b4b4b4');
                }
            });
            $("#register-modal").on("submit",function(event){
                event.preventDefault();
                var data={
                    "phone": $.trim($("#register_phone").val()),
                    "invite_code":$.trim($("#register_invite_code").val()),
                };
                if(data.phone==""){
                    DIALOG.error("请输入手机号");
                    return false;
                }else if(!haloValidation.checkPhone(data.phone)){
                    DIALOG.error("请输入有效的手机号");
                    return false;
                }else if(data.invite_code==''){
                    DIALOG.error("请输入邀请码");
                    return false;
                }
                hb.util.loading.show();
                $.ajax({
                    dataType : "jsonp",
                    url: "http://college.halobear.com/api/verify",
                    data: data,
                    success: function(data) {
                        hb.util.loading.hide();
                        if(data.iRet==1){
                            $('#register-modal').on('hidden.bs.modal', afterGetRegCode);
                            $("#register-modal").modal('hide');
                        }else if(data.iRet==0){
                            DIALOG.error(data.info);
                            return false;
                        }

                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        DIALOG.error("网络繁忙请稍候再试");
                    }
                })
            })
        },
        zcBtn:function(){
            var haloAuth=window.app.index.haloAuth();
            var DIALOG=window.app.index.DIALOG;
            var haloValidation=hb.validation;
            $("#zc_btn").on("click",function(event){
                event.preventDefault();
                var data={
                    "verify_code":$.trim($("#n_register_verify_code").val()),
                    "phone":$.trim($("#n_register_phone").val()),
                    "username":$.trim($("#n_register_username").val()),
                    "company":$.trim($("#n_register_company").val()),
                    "city":$.trim($("#n_register_city").val()),
                    "wechat":$.trim($("#n_register_wechat").val()),
                    "password":$("#n_register_password").val(),
                    "invite_code":$.trim($("#n_register_invite_code").val()),
                };
                if(data.verify_code==""){
                    DIALOG.error("请输入短讯验证码");
                    return false;
                }else if(data.phone==""){
                    DIALOG.error("请输入手机号");
                    return false;
                }else if(!haloValidation.checkPhone(data.phone)){
                    DIALOG.error("请输入有效的手机号");
                    return false;
                }else if(data.username==""){
                    DIALOG.error("请输入昵称");
                    return false;
                }else if(data.company==""){
                    DIALOG.error("请输入公司名");
                    return false;
                }else if(data.city==""){
                    DIALOG.error("请输入城市");
                    return false;
                }else if(data.wechat==""){
                    DIALOG.error("请输入微信号");
                    return false;
                }else if(data.password==""){
                    DIALOG.error("请输入密码");
                    return false;
                }else if(data.invite_code==""){
                    DIALOG.error("请输入邀请码");
                    return false;
                }
                hb.util.loading.show();
                $.ajax({
                    dataType : "jsonp",
                    url: "http://college.halobear.com/api/register",
                    data: data,
                    //type: 'POST',
                    success: function(data) {
                        if(data.iRet==1){
                            hb.util.loading.hide();
                            DIALOG.success("您已注册成功！");
                            var token=data.data.token;
                            var user=data.data.user;
                            //window.localStorage.setItem("token",JSON.stringify(token));
                            //window.localStorage.setItem("user",JSON.stringify(user));
                            haloAuth.setToken(token);
                            haloAuth.setUser(user);

                            $("#zc-modal").attr("aria-hidden","true").css({
                                "display":"none",
                                "opacity":0
                            });
                            $("#zc-modal,#login-modal,#register-modal").modal('hide');
                            /*$(".login-btn.login").text("欢迎你，"+data.data.user.username).attr("disabled","true").css("opacity","1");
                             $(".login-btn.register").css("display","none");
                             $("#drop_menu").css({"display":"none","cursor":"text"});
                             $("#summit-drop>a").text(user.username);*/
                            $("[nav-before-login]").hide();
                            $("[nav-after-login]").show();
                            $('#nav-login-btn-hidden').text(user.username);
                        }else{
                            DIALOG.error(data.info);
                            hb.util.loading.hide();
                            return false;
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        DIALOG.error("网络繁忙请稍候再试");
                    }
                })
            })
        },
        uiForms: function() {
            jQuery('.form-material.floating > .form-control').each(function() {
                var $input = jQuery(this);
                var $parent = $input.parent('.form-material');

                $input.on('change', function() {
                    if ($input.val()) {
                        $parent.addClass('open');
                    } else {
                        $parent.removeClass('open');
                    }
                });
            });
        },
        login: function() {
            var deferred = $.Deferred();
            var userService=window.app.index.userService();
            var DIALOG=window.app.index.DIALOG;
            var haloAuth=window.app.index.haloAuth();


            $("#show-forget-password-bt").on("click",function( event ) {
                $("#school-form-login").hide();
                $("#school-form-forget-password").show();
            });

            $("#school-form-login").on("submit",function( event ) {
                //console.log(userService);
                event.preventDefault();
                hb.util.loading.show();
                userService.login({
                    phone: $.trim($("#login-username").val()),
                    password:$("#login-password").val()
                }).then(function(res){
                    hb.util.loading.hide();
                    DIALOG.success(res.info);
                    haloAuth.setToken(res.data.token);
                    haloAuth.setUser(res.data.user);
                    //console.log(res);
                    $('#login-modal').modal('hide');
                    deferred.resolve('login success');
                    /*$(".login-btn.login").text("欢迎你，"+res.data.user.username).attr("disabled","true").css("opacity","1");
                     $(".btn.register").css("display","none");
                     $("#drop_menu").css({"display":"none","cursor":"text"});
                     $("#summit-drop>a").text(res.data.user.username);
                     $("#nav-login-btn").on("click",function(event){
                     event.preventDefault();
                     $("#nav-login-btn").attr("data-target","");
                     DIALOG.error("你已经登入，不能重复登入");
                     })*/
                    //var token=haloAuth.getToken();
                    //var user=haloAuth.getUser();

                    //var token=window.localStorage.getItem('token');
                    //var user=JSON.parse(window.localStorage.getItem("user"));
                    $("[nav-before-login]").hide();
                    $("[nav-after-login]").show();
                    $('#nav-login-btn-hidden').text(res.data.user.username);
                },function(res){
                    hb.util.loading.hide();
                    DIALOG.error(res);
                });

            });
            return deferred.promise();
        },
        forgetPassword: function() {
            var deferred = $.Deferred();
            var userService=window.app.index.userService();
            var DIALOG=window.app.index.DIALOG;
            var haloAuth=window.app.index.haloAuth();
            $("#show-login-bt").on("click",function( event ) {
                $("#school-form-login").show();
                $("#school-form-forget-password").hide();
            });

            $("#get-forget-password-verify-code-bt").on("click",function( event ) {
                hb.util.loading.show();
                userService.getResetPasswordVerifyCode({
                    phone: $.trim($("#forget-password-phone").val())
                }).then(function(res){
                    hb.util.loading.hide();
                    var count=60;
                    $("#get-forget-password-verify-code-bt").prop( "disabled", true ).text(count+'秒后点击重发');
                    hb.interval(function(){
                        count--;
                        $("#get-forget-password-verify-code-bt").prop( "disabled", true ).text(count+'秒后点击重发');
                    },1000,60,function(){
                        $("#get-forget-password-verify-code-bt").prop( "disabled", false ).text('重新发送');
                    });
                },function(res){
                    hb.util.loading.hide();
                    DIALOG.error(res);
                });

            });


            $("#school-form-forget-password").on("submit",function( event ) {
                //console.log(userService);
                event.preventDefault();
                hb.util.loading.show();
                userService.resetPassword({
                    verify_code: $.trim($("#forget-password-verify-code").val()),
                    phone: $.trim($("#forget-password-phone").val()),
                    password:$("#forget-password-password").val(),
                    rpassword:$("#forget-password-rpassword").val()
                }).then(function(res){
                    hb.util.loading.hide();
                    DIALOG.success(res.info);
                    $("#school-form-login").show();
                    $("#school-form-forget-password").hide();
                    $("#login-username").val($("#forget-password-phone").val()).parent().addClass('open');
                },function(res){
                    hb.util.loading.hide();
                    DIALOG.error(res);
                });

            });
            return deferred.promise();
        },
        summitHover: function() {
            $(".summit-drop").hover(
                function() {
                    $(".summit-drop").addClass("open");
                    $(".summit-drop").attr("aria-expanded","true");

                },
                function() {
                    $(".summit-drop").removeClass("open");
                    $(".summit-drop").attr("aria-expanded","false");
                }
            )
        },
        loginInit:function(){

        },
        userService:function(){
            var haloValidation=hb.validation;
            var login=function(data){
                var deferred = $.Deferred();
                var init=function(){
                    data=data||{};
                    switch (true){
                        case !data.phone:
                            deferred.reject('请输入手机号');
                            break;
                        case !haloValidation.checkPhone(data.phone):
                            deferred.reject('您的手机号格式错误');
                            break;
                        case !data.password:
                            deferred.reject('请输入密码');
                            break;
                        default:
                            sendXhr();
                    }
                };
                var sendXhr=function(){
                    $.ajax({
                        //method: "POST",
                        dataType : "jsonp",
                        url: "http://college.halobear.com/api/login",
                        //url: "http://college.halobear.com/api/login",
                        //timeout: 10000,
                        data: data,
                        success: function(res, textStatus, errorThrown) {
                            //console.log(res);
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
            };
            var getResetPasswordVerifyCode=function(data){
                var deferred = $.Deferred();
                var init=function(){
                    data=data||{};
                    switch (true){
                        case !data.phone:
                            deferred.reject('请输入手机号');
                            break;
                        case !haloValidation.checkPhone(data.phone):
                            deferred.reject('您的手机号格式错误');
                            break;
                        default:
                            sendXhr();
                    }
                };
                var sendXhr=function(){
                    $.ajax({
                        //method: "POST",
                        dataType : "jsonp",
                        url: "http://college.halobear.com/api/forgetCode",
                        //url: "http://college.halobear.com/api/login",
                        //timeout: 10000,
                        data: data,
                        success: function(res, textStatus, errorThrown) {
                            //console.log(res);
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
            };
            var resetPassword=function(data){
                var deferred = $.Deferred();
                var init=function(){
                    data=data||{};
                    switch (true){
                        case !data.phone:
                            deferred.reject('请输入手机号');
                            break;
                        case !haloValidation.checkPhone(data.phone):
                            deferred.reject('您的手机号格式错误');
                            break;
                        case !data.verify_code:
                            deferred.reject('请输入验证码');
                            break;
                        case data.verify_code.length!==6:
                            deferred.reject('您的6位数字验证码错误');
                            break;
                        case !data.password:
                            deferred.reject('请输入密码');
                            break;
                        case data.password.length<6||data.password.length>32:
                            deferred.reject('密码长度6-32个字符');
                            break;
                        case !data.rpassword:
                            deferred.reject('请重复密码');
                            break;
                        case data.password!=data.rpassword:
                            deferred.reject('您两次输入的密码不一致');
                            break;
                        default:
                            sendXhr();
                    }
                };
                var sendXhr=function(){
                    $.ajax({
                        //method: "POST",
                        dataType : "jsonp",
                        url: "http://college.halobear.com/api/forget",
                        //url: "http://college.halobear.com/api/login",
                        //timeout: 10000,
                        data: data,
                        success: function(res, textStatus, errorThrown) {
                            //console.log(res);
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
            };
            return{
                login:login,
                getResetPasswordVerifyCode:getResetPasswordVerifyCode,
                resetPassword:resetPassword
            }

        },
        haloAuth:function(){
            var domain=hb.location.url('domain');
            var hostname=hb.location.url('hostname');
            if(hostname=='localhost'){
                var domain='';
            }else{
                var domain=hb.location.url('domain')||'';
            }
            //console.log(domain,hostname);
            var setUser=function(data){
                //window.localStorage.setItem('user', JSON.stringify(data));
                hb.Cookies.set('halo_user', data, { domain: domain, expires: 30 });
            };
            var getUser=function(){
                //return JSON.parse(window.localStorage.getItem('user'));
                return hb.Cookies.getJSON('halo_user');
            };

            var setToken=function(data){

                //window.localStorage.setItem('token', JSON.stringify(data));

                hb.Cookies.set('halo_token', data, { domain: domain , expires: 30});
            };
            var getToken=function(){

                //return JSON.parse(window.localStorage.getItem('token'));
                return hb.Cookies.getJSON('halo_token');
            };
            var removeToken=function(){
                //window.localStorage.removeItem('token');
                hb.Cookies.remove('halo_token', { domain: domain }); // removed!

            };
            var removeUser=function(){
                //window.localStorage.removeItem('user');
                hb.Cookies.remove('halo_user', { domain: domain }); // removed!
            };
            var _clear=function(){
                //window.localStorage.removeItem('user');
                //window.localStorage.removeItem('token');
                removeToken();
                removeUser();
            };

            return{
                setUser:setUser,
                getUser:getUser,
                removeUser:removeUser,
                setToken:setToken,
                getToken:getToken,
                removeToken:removeToken,
                clear:_clear
            }
        },
        DIALOG:{
            loading: function(info, callback){
                this.create('loading', info, callback);
            },
            success: function(info, callback){
                this.create('success', info, callback);
            },
            error: function(info, callback){
                this.create('error', info, callback);
            },
            remove: function(callback){
                $('.dialog-box').slideUp(600, callback);
            },
            create: function(type, info, callback){
                var span = 'glyphicon-remove-sign';
                if (type == 'success') {
                    span = 'glyphicon-ok-sign';
                }else if(type == 'loading'){
                    span = 'glyphicon-refresh';
                }

                var html = '<div class="dialog-box"><div class="dialog-content"><div class="'+ type +'"><span class="glyphicon '+ span +'"></span>'+ info +'</div></div></div>';
                $('.dialog-box').fadeOut('fast', function() {
                    $(this).remove();
                });
                $('body').append(html);
                $('.dialog-box').slideDown(500);

                //if (type != 'loading') {
                var _this=this;
                setTimeout(function(){
                    _this.remove(callback);
                }, 2000);
                //}
            }
        },
        topicEllipsis:topicEllipsis,
        resizeLogo:resizeLogo,

    };
}());







