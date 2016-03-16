/**
 * Created by Administrator on 2016/3/16.
 */
app.picureDetail=(function(){
    "use strict";

    function collect(){
        $('#markThisPic-sidebar,#markThisPic-comment').on('click',function(){
            hb.util.loading.show();
            app.service.picture.collect({record_id:appData.id}).then(function(res){
                hb.util.loading.hide();
                markSuccess();
            },function(res){
                app.index.DIALOG.error(res);
                hb.util.loading.hide();
            });
        });
        $('#unMarkThisPic-sidebar,#unMarkThisPic-comment').on('click',function(){
            hb.util.loading.show();
            app.service.picture.unCollect({id:appData.id}).then(function(res){
                hb.util.loading.hide();
                unMarkSuccess();
            },function(res){
                app.index.DIALOG.error(res);
                hb.util.loading.hide();
            });
        });

        function markSuccess(){
            var num=$('#picture-desc-list-item-num').text();
            num++;
            $('#picture-desc-list-item-num').text(num);
            $('#markThisPic-sidebar,#markThisPic-comment').hide();
            $('#unMarkThisPic-sidebar,#unMarkThisPic-comment').show();
        }
        function unMarkSuccess(){
            var num=$('#picture-desc-list-item-num').text();
            num--;
            $('#picture-desc-list-item-num').text(num);
            $('#markThisPic-sidebar,#markThisPic-comment').show();
            $('#unMarkThisPic-sidebar,#unMarkThisPic-comment').hide();
        }

    }

    return{
        collect:collect
    }

}());