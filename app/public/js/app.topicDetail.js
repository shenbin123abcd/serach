/**
 * Created by Administrator on 2016/3/18.
 */
app.topicDetail = (function () {
    "use strict";

    function collect() {
        $('#markThis-sidebar,#markThis-comment').on('click', function () {
            hb.util.loading.show();
            app.service.topic.collect({record_id: appData.id}).then(function (res) {
                hb.util.loading.hide();
                markSuccess();
            }, function (res) {
                app.index.DIALOG.error(res);
                hb.util.loading.hide();
            });
        });
        $('#unMarkThis-sidebar,#unMarkThis-comment').on('click', function () {
            hb.util.loading.show();
            app.service.topic.unCollect({id: appData.id}).then(function (res) {
                hb.util.loading.hide();
                unMarkSuccess();
            }, function (res) {
                app.index.DIALOG.error(res);
                hb.util.loading.hide();
            });
        });

        function markSuccess() {
            var num = $('#desc-list-item-num-points').text();
            num++;
            $('#desc-list-item-num-points').text(num);
            $('#markThis-sidebar,#markThis-comment').hide();
            $('#unMarkThis-sidebar,#unMarkThis-comment').show();
        }

        function unMarkSuccess() {
            var num = $('#desc-list-item-num-points').text();
            num--;
            $('#desc-list-item-num-points').text(num);
            $('#markThis-sidebar,#markThis-comment').show();
            $('#unMarkThis-sidebar,#unMarkThis-comment').hide();
        }

    }

    function comment() {
        $('#commit-form').on('submit', function () {
            event.preventDefault();
            hb.util.loading.show();
            app.service.topic.comment({
                record_id: appData.id,
                content: $('#commit-form-content').val(),
            }).then(function (res) {
                hb.util.loading.hide();
                $('#commit-form-content').val('');
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


        app.service.topic.getComments({id: appData.id}).then(function (res) {
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
                        if(i<(page*perPage-1)&&i>((page-1)*perPage)-1){
                            htmlStr += `
                            <div class="text-item-wrapper case">
                                <div class="commit-text-item clearfix">
                                    <div class="item-pic">
                                        <img src="/images/commet-avatar-sample.png" />
                                    </div>
                                    <div class="item-desc">
                                        <p><span class="name f-14">${n.username}</span><span class="f-12">${moment(n.created_at).fromNow()}</span></p>
                                        <p class="f-16">${n.content}</p>
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