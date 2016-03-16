/**
 * Created by Administrator on 2016/3/16.
 */
app.picureDetail = (function () {
    "use strict";

    function collect() {
        $('#markThisPic-sidebar,#markThisPic-comment').on('click', function () {
            hb.util.loading.show();
            app.service.picture.collect({record_id: appData.id}).then(function (res) {
                hb.util.loading.hide();
                markSuccess();
            }, function (res) {
                app.index.DIALOG.error(res);
                hb.util.loading.hide();
            });
        });
        $('#unMarkThisPic-sidebar,#unMarkThisPic-comment').on('click', function () {
            hb.util.loading.show();
            app.service.picture.unCollect({id: appData.id}).then(function (res) {
                hb.util.loading.hide();
                unMarkSuccess();
            }, function (res) {
                app.index.DIALOG.error(res);
                hb.util.loading.hide();
            });
        });

        function markSuccess() {
            var num = $('#picture-desc-list-item-num-points').text();
            num++;
            $('#picture-desc-list-item-num-points').text(num);
            $('#markThisPic-sidebar,#markThisPic-comment').hide();
            $('#unMarkThisPic-sidebar,#unMarkThisPic-comment').show();
        }

        function unMarkSuccess() {
            var num = $('#picture-desc-list-item-num-points').text();
            num--;
            $('#picture-desc-list-item-num-points').text(num);
            $('#markThisPic-sidebar,#markThisPic-comment').show();
            $('#unMarkThisPic-sidebar,#unMarkThisPic-comment').hide();
        }

    }

    function comment() {
        $('#picture-commit-form').on('submit', function () {
            event.preventDefault();
            hb.util.loading.show();
            app.service.picture.comment({
                record_id: appData.id,
                content: $('#picture-commit-form-content').val(),
            }).then(function (res) {
                hb.util.loading.hide();
                $('#picture-commit-form-content').val('');
                getComments();
            }, function (res) {
                hb.util.loading.hide();
                if(typeof res=='string'){
                    app.index.DIALOG.error(res);
                    return
                }
                if(res.iRet==-1){
                    $('#login-modal').modal('show');
                }
            });
        });
    }

    function getComments() {
        //console.log('re')
        $('#picture-commit-box').empty().append(`<div class="loading-box"><i class="fa fa-spinner fa-spin"></i></div>`);


        app.service.picture.getComments({id: appData.id}).then(function (res) {
            $('#picture-desc-list-item-num-comments,#picture-comments-sidebar').text(res.data.length);

            var perPage = 5;
            var totalPages=Math.ceil(res.data.length/perPage);
            if($('#picture-comment-pagination').data().twbsPagination){
                $('#picture-comment-pagination').twbsPagination('destroy');
            }
            if(totalPages<=1){
                $('#picture-comment-pagination').hide();
            }else{
                $('#picture-comment-pagination').show();
            }
            $('#picture-comment-pagination').twbsPagination({
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
                        if(i<(page*perPage-1)&&i>((page-1)*perPage)-1){
                        htmlStr += `
                            <div class="text-item-wrapper">
                                <div class="commit-text-item">
                                    <div class="item-pic">
                                        <img src="/images/commet-avatar-sample.png" />
                                    </div>
                                    <div class="item-desc">
                                        <p><span class="name f-16">${n.username}</span><span class="f-12">${moment(n.created_at).fromNow()}</span></p>
                                        <p class="f-16">${n.content}</p>
                                    </div>
                                </div>
                            </div>
                        `;
                        }
                    });


                    $('#picture-commit-box').empty().append(`
                        <p class="commit-num f-14">${res.data.length}条评论</p>
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