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
            var num = $('#picture-desc-list-item-num').text();
            num++;
            $('#picture-desc-list-item-num').text(num);
            $('#markThisPic-sidebar,#markThisPic-comment').hide();
            $('#unMarkThisPic-sidebar,#unMarkThisPic-comment').show();
        }

        function unMarkSuccess() {
            var num = $('#picture-desc-list-item-num').text();
            num--;
            $('#picture-desc-list-item-num').text(num);
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
                getComments();
            }, function (res) {
                app.index.DIALOG.error(res);
                hb.util.loading.hide();
            });
        });
    }

    function getComments() {
        //console.log('re')
        app.service.picture.getComments({id: appData.id}).then(function (res) {
            $('#picture-commit-box').empty().append(`<i class="fa fa-spinner fa-spin"></i>`);
            var htmlStr = '';
            res.data.forEach((n, i)=> {
                htmlStr += `
                    <div class="text-item-wrapper">
                        <div class="commit-text-item">
                            <div class="item-pic">
                                <img src="/images/commet-avatar-sample.png" />
                            </div>
                            <div class="item-desc">
                                <p><span class="name f-16">${n.username}</span><span class="f-12">1天前</span></p>
                                <p class="f-16">${n.content}</p>
                            </div>
                        </div>
                    </div>
                        `;
            });


            $('#picture-commit-box').empty().append(`
                <p class="commit-num f-14">${res.data.length}条评论</p>
                <div class="commit-text">

                   ${htmlStr}
                </div>


            `);
        });
    }

    return {
        collect: collect,
        comment: comment,
        getComments: getComments,
    }

}());