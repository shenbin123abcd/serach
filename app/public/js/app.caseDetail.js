app.caseDetail=(function(){
    "use strict";
    var haloAuth=window.app.index.haloAuth();
    var user=haloAuth.getUser()||{};
    var timeStamp=new Date().getTime();
    function afterDialogLoginSuccess(res){
        window.app.index.DIALOG.success(res.info);
        $("[nav-before-login]").hide();
        $("[nav-after-login]").show();
        $('#nav-login-btn-hidden').text(res.data.user.username);
    }


    function collect() {
        $('#markThis-sidebar,#markThis-comment').on('click', function () {
            hb.util.loading.show();
            app.service.case.collect({record_id: appData.id}).then(function (res) {
                hb.util.loading.hide();
                markSuccess();
            }, function (res) {
                hb.util.loading.hide();
                if(typeof res=='string'){
                    app.index.DIALOG.error(res);
                    return
                }
                if(res.iRet==-1){
                    hb.account.login(function(res){
                        afterDialogLoginSuccess(res);
                    });
                }

            });
        });
        $('#unMarkThis-sidebar,#unMarkThis-comment').on('click', function () {
            hb.util.loading.show();
            app.service.case.unCollect({id: appData.id}).then(function (res) {
                hb.util.loading.hide();
                unMarkSuccess();
            }, function (res) {
                hb.util.loading.hide();
                if(typeof res=='string'){
                    app.index.DIALOG.error(res);
                    return
                }
                if(res.iRet==-1){
                    hb.account.login(function(res){
                        afterDialogLoginSuccess(res);
                    });
                }
            });
        });

        function markSuccess() {
            var num = $('#desc-list-item-num-points').text();
            num++;
            $('#desc-list-item-num-points').text(num);
            $('[collect-points]').text(num);
            $('#markThis-sidebar,#markThis-comment').hide();
            $('#unMarkThis-sidebar,#unMarkThis-comment').show();
        }

        function unMarkSuccess() {
            var num = $('#desc-list-item-num-points').text();
            num--;
            $('#desc-list-item-num-points').text(num);
            $('[collect-points]').text(num);
            $('#markThis-sidebar,#markThis-comment').show();
            $('#unMarkThis-sidebar,#unMarkThis-comment').hide();
        }

    }

    function comment() {
        $('#commit-form').on('submit', function (event) {
            event.preventDefault();
            hb.util.loading.show();
            app.service.case.comment({
                record_id: appData.id,
                content: $('#commit-form-content').val(),
            }).then(function (res) {
                hb.util.loading.hide();
                $('#commit-form-content').val('');
                getComments();
                $('.num').text(500);
            }, function (res) {
                hb.util.loading.hide();
                if(typeof res=='string'){
                    app.index.DIALOG.error(res);
                    return
                }
                if(res.iRet==-1){
                    //$('#login-modal').modal('show');
                    hb.account.login(function(res){
                        afterDialogLoginSuccess(res);
                    });
                }
            });
        });
    }

    function getComments() {
        //console.log('re')
        $('#picture-commit-box').empty().append(`<div class="loading-box"><i class="fa fa-spinner fa-spin"></i></div>`);


        app.service.case.getComments({id: appData.id}).then(function (res) {
            $('#desc-list-item-num-comments,#comments-sidebar').text(res.data.length);

            var perPage = 5;
            var totalPages=Math.ceil(res.data.length/perPage);
            if($('#comment-pagination').data().twbsPagination){
                $('#comment-pagination').twbsPagination('destroy');
            }
            if(totalPages<=1){
                $('#comment-pagination').hide();
            }else{
                $('#comment-pagination').show();
            }
            $('#comment-pagination').twbsPagination({
                totalPages: totalPages||1,
                visiblePages: (function(){
                    if(totalPages>7){
                        return 7;
                    }else{
                        return totalPages||1;
                    }
                }()),
                first:  '<<',
                prev : '<',
                next :'>',
                last :'>>',
                onPageClick: function (event, page) {
                    //console.log( page);
                    var htmlStr = '';
                    res.data.forEach((n, i)=> {
                        if(user.id==n.uid){
                            n.c_avatar=n.avatar+'?_='+timeStamp
                        }else{
                            n.c_avatar=n.avatar
                        }
                        if(i<=(page*perPage-1)&&i>((page-1)*perPage)-1){
                            //console.log(i)
                            htmlStr += `
                            <div class="text-item-wrapper case">
                                <div class="commit-text-item">
                                    <div class="item-pic">
                                        <img src="${n.c_avatar}" />
                                    </div>
                                    <div class="item-desc">
                                        <p><span class="name f-14">${n.username}</span><span class="f-12">${moment(n.created_at).fromNow()}</span></p>
                                            ${n.content}
                                    </div>
                                </div>
                            </div>
                        `;
                        }
                    });


                    $('#commit-box').empty().append(`
                        <p class="commit-num f-12">${res.data.length}条评论</p>
                        <div class="commit-text">
                           ${htmlStr}
                        </div>

                    `);

                }
            });


        });
    }

    return {
        collect: collect,
        comment: comment,
        getComments: getComments,
    }


}());