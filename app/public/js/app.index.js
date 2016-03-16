app.index=(function(){
    "use strict";

    return {
        lazy: function() {
            $("img.lazy").lazyload({
                placeholder: "/images/1px.png",
                effect: "fadeIn",
                threshold: 180,
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
            var token=window.localStorage.getItem('token');
            var user=JSON.parse(window.localStorage.getItem("user"));
            if(token){
                $("#nav-login-btn").on("click",function(event){
                    event.preventDefault();
                    $("#nav-login-btn").attr("data-target","");
                    DIALOG.error("你已经登入，不能重复登入");
                })
            }else{
                $("#nav-login-btn").attr("data-target","#login-modal");
            }
        },
        register:function(){
            var userService=window.app.index.userService();
            var DIALOG=window.app.index.DIALOG;
            $("#register_phone").on("input",function(){
                var num = parseInt($(this).val().length);
                if(num===11){
                    $(".login-btn").css("color",'#fff').css("background",'#e74c3c');
                }else if(num>11){
                    DIALOG.error("请输入正确的手机号");
                    $(this).val("");
                    $(".login-btn").css("color",'#fff').css("background",'#b4b4b4');
                }
            });
            $("#register-modal").on("submit",function(event){
                event.preventDefault();
                var data={
                    /*"invite_code": $.trim($("#register_invite_code").val()),*/
                    "phone": $.trim($("#register_phone").val())
                }
                /*if(data.invite_code==""){
                    DIALOG.error("请输入邀请码");
                    return false;
                }else */if(data.phone==""){
                    DIALOG.error("请输入手机号");
                    return false;
                }
                hb.util.loading.show();
                $.ajax({
                    dataType : "jsonp",
                    url: "http://college.halobear.com/api/verify",
                    data: data,
                    success: function(data) {
                        hb.util.loading.hide();
                        $("#register-modal").attr("aria-hidden","true").css("display","none");
                        $("#zc-modal").attr("aria-hidden","false").css({
                            "display":"block",
                            "opacity":1
                        });
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        DIALOG.error("网络繁忙请稍候再试");
                    }
                })
            })
        },
        zcBtn:function(){
            var DIALOG=window.app.index.DIALOG;
            $("#zc_btn").on("click",function(event){
                event.preventDefault();
                var data={
                    "verify_code":$.trim($("#n_register_verify_code").val()),
                    /*"invite_code":$.trim($("#n_register_invite_code").val()),*/
                    "phone":$.trim($("#n_register_phone").val()),
                    "username":$.trim($("#n_register_username").val()),
                    "company":$.trim($("#n_register_company").val()),
                    "city":$.trim($("#n_register_city").val()),
                    "wechat":$.trim($("#n_register_wechat").val()),
                    "password":$.trim($("#n_register_password").val()),
                };
                if(data.verify_code==""){
                    DIALOG.error("请输入短讯验证码");
                    return false;
                }/*else if(data.invite_code==""){
                    DIALOG.error("请输入邀请码");
                    return false;
                }*/else if(data.phone==""){
                    DIALOG.error("请输入手机号");
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
                }
                hb.util.loading.show();
                $.ajax({
                    dataType : "json",
                    url: "http://college.halobear.com/api/register",
                    data: data,
                    type: 'POST',
                    success: function(data) {
                        if(data.iRet==1){
                            hb.util.loading.hide();
                            console.log(data);
                            var token=data.data.token;
                            var user=data.data.user;
                            window.localStorage.setItem("token",JSON.stringify(token));
                            window.localStorage.setItem("user",JSON.stringify(user));
                            $("#zc-modal").attr("aria-hidden","true").css({
                                "display":"none",
                                "opacity":0
                            });
                            $("#zc-modal,#login-modal,#register-modal").modal('hide');
                            $(".login-btn.login").text("欢迎你，"+data.data.user.username).attr("disabled","true").css("opacity","1");
                            $(".login-btn.register").css("display","none");
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

            $("#school-form-login").on("submit",function( event ) {
                //console.log(userService);
                event.preventDefault();
                hb.util.loading.show();
                userService.login({
                    phone: $.trim($("#login-username").val()),
                    password:$.trim($("#login-password").val())
                }).then(function(res){
                    hb.util.loading.hide();
                    DIALOG.success(res.info);
                    haloAuth.setToken(res.data.token);
                    haloAuth.setUser(res.data.user);
                    $('#login-modal').modal('hide');
                    deferred.resolve('login success');
                    //window.localStorage.getItem('token');
                    $(".login-btn.login").text("欢迎你，"+res.data.user.username).attr("disabled","true").css("opacity","1");
                    $(".btn.register").css("display","none");
                    $("ul.nav-dropdown-menu").css({"display":"none","cursor":"text"});
                    $(".summit-drop>a").text(res.data.user.username);
                    $("#nav-login-btn").on("click",function(event){
                        event.preventDefault();
                        $("#nav-login-btn").attr("data-target","");
                        DIALOG.error("你已经登入，不能重复登入");
                    })
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
            var token=window.localStorage.getItem('token');
            var user=JSON.parse(window.localStorage.getItem("user"));
            if(token){
                $(".login-btn.login").text("欢迎你，"+user.username).attr("disabled","true").css("opacity","1");
                $(".btn.register").css("display","none");
                $("ul.nav-dropdown-menu").css({"display":"none","cursor":"text"});
                $(".summit-drop>a").text(user.username);
            }else{
                $(".login-btn.login").text("登录幻熊通行证");
            }
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
                login:login
            }

        },
        haloAuth:function(){
            var setUser=function(data){
                window.localStorage.setItem('user', JSON.stringify(data));
            };
            var getUser=function(){
                return JSON.parse(window.localStorage.getItem('user'));
            };

            var setToken=function(data){
                window.localStorage.setItem('token', JSON.stringify(data));
            };
            var getToken=function(){
                return JSON.parse(window.localStorage.getItem('token'));
            };
            var removeToken=function(){
                window.localStorage.removeItem('token');
            };
            var removeUser=function(){
                window.localStorage.removeItem('user');
            };
            var _clear=function(){
                window.localStorage.removeItem('user');
                window.localStorage.removeItem('token');
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

    };
}());

app.caseDetail=(function(){
    "use strict";
    var companyDesc=function(){
        var init=function(){
            var imgHeight=$(".company-img").css("height");
            $(".company-desc").css("height",imgHeight);
        }
        init();
        $(window).resize(function() {
            init();
        });
    };
    var verticalMiddle=function(WrapperIndex,InnerIndex){
        var WrapperHeight=parseInt($("."+WrapperIndex).css("height"));
        var innerHeight=parseInt($("."+InnerIndex).css("height"));
        var num=((WrapperHeight-innerHeight)/2);
        $("."+InnerIndex).css("position","relative").css("top",num);
    };
    var commitForm=function(){
        $("textarea").on("input",function(){
            var num = 500-parseInt($(this).val().length);
            $(".num").text(num);
        })
    };
    function omit(){
        var desc_title_text = $(".desc_title").text().substr(0,8)+"...";
        $(".desc_title").text(desc_title_text);
        var desc_company_text = $(".desc_company").text().substr(0,8)+"...";
        $(".desc_company").text(desc_company_text);
    }
    return {
        companyDesc:companyDesc,
        verticalMiddle:verticalMiddle,
        commitForm:commitForm,
        omit:omit,
    }
}());






