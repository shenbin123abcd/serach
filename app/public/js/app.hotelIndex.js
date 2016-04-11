app.hotelIndex=(function(){
    "use strict";
    var searchPara = hb.location.url("?") || {};
    var regionTab=function(){
        var htmlStr = '';
        var htmlStr_level3 = '';
        var level,parent_id,grand_parent_id;
        var region=window.region;
        //console.log(region);

        if(appData.query.r){

            $.each(region,function(i,n){
                if(appData.query.r==n.region_id){
                    level=Number(n.level);
                    parent_id=Number(n.parent_id);
                    return;
                }
            });

            switch(level){
                case 1:
                    $.each(region,function(i,n) {
                        if(appData.query.r==n.parent_id){
                            htmlStr += `
                        <li><a href="?r=${n.region_id}" >${n.region_name}</a></li>
                    `;
                        }
                    });
                    $("#area-list-level-2").empty().append(htmlStr);
                    renderList();
                    break;
                case 2:

                    $.each(region,function(i,n){
                        if(parent_id==n.parent_id){
                            htmlStr += `
                        <li><a href="?r=${n.region_id}" class="${(appData.query.r==n.region_id)&&'active'}"  >${n.region_name}</a></li>
                    `;
                        }
                    });
                    $(`#area-item-${parent_id}`).addClass('active');
                    $("#area-list-level-2").empty().append(htmlStr);

                    $("#area-list-level-3").empty().append(`<div class="loading-box" ><i class="fa fa-spinner fa-spin"></i></div>`);

                    app.service.getChildrenRegion({pid:appData.query.r}).then(function(res){
                        $.each(res,function(i,n){
                            htmlStr_level3 += `
                                <li><a href="?r=${n.id}" >${n.name}</a></li>
                            `;
                        });
                        $("#area-list-level-3").empty().append(htmlStr_level3);
                    });
                    renderList();
                    break;

            }

            if(!level){
                app.service.getSiblingsRegion({id:appData.query.r}).then(function(res){
                    parent_id=res[0].parent_id;
                    $.each(region,function(i,n){
                        if(parent_id==n.region_id){
                            grand_parent_id=Number(n.parent_id);
                            level=Number(n.level);
                            return
                        }
                    });

                    $.each(res,function(i,n){

                        htmlStr_level3 += `
                                <li><a href="?r=${n.id}" class="${(appData.query.r==n.id)&&'active'}"   >${n.name}</a></li>
                            `;
                    });

                    $.each(region,function(i,n){
                        if(grand_parent_id==n.parent_id){
                            htmlStr += `
                        <li><a href="?r=${n.region_id}" class="${(parent_id==n.region_id)&&'active'}"  >${n.region_name}</a></li>
                    `;
                        }
                    });
                    $(`#area-item-${grand_parent_id}`).addClass('active');
                    $("#area-list-level-2").empty().append(htmlStr);
                    $("#area-list-level-3").empty().append(htmlStr_level3);

                });
            }

        }else{
            renderList();
        }


        function renderList(){

            switch(level){
                case 1:
                    $("[data-region]").each(function(){
                        var val=$(this).text();
                        var strArr=val.split(/\s+/g);
                        $(this).text(strArr[1]+' '+(strArr[2]||'')).show();
                    });
                    break;
                case 2:
                    $("[data-region]").each(function(){
                        var val=$(this).text();
                        var strArr=val.split(/\s+/g);
                        $(this).text(strArr[2]||'').show();
                    });
                    break;
                case 3:

                    break;
                default:
                    $("[data-region]").each(function(){
                        var val=$(this).text();
                        var strArr=val.split(/\s+/g);
                        $(this).text(strArr[0]+' '+strArr[1]).show();
                    });

            }

        }






        //var filterArr=$.map( region, function( v, k) {
        //    // Do something
        //
        //});
        //
        //
        //
        //
        //htmlStr += `
        //                <li><a href="?r=${n.region_id}" class="">${n.region_name}</a></li>
        //            `;
        //$("#area-list-level-2").empty().append(htmlStr);








        //$('.city-list>li>a').on("click", function (event) {
        //    var _this = this;
        //    event.preventDefault();
        //    $('.city-list>li>a').removeClass("active");
        //    $('.area-list').html();
        //    $(this).addClass("active");
        //    $.getScript("http://localhost:9000/app/public/js/region.js", function (data) {
        //
        //        var selectedId = $(_this).attr("data-id");
        //        var html = "";
        //        var arr = [];
        //        $.each(region, function (index, val) {
        //            if (selectedId === val.parent_id) {
        //                arr.push(region[index].region_name);
        //            }
        //        });
        //        for (var i = 0; i < arr.length; i++) {
        //            html += '<li><a href="">' + arr[i] + '</a></li>';
        //        }
        //        $(".area-list").html(html);
        //    })
        //})
    };
    function pagActive(){
        var totalPages=Math.ceil(appData.total/appData.per_page);
        //console.log(appData.total,appData.per_page,searchPara)

        //console.log(totalPages);
        //console.log((searchPara.sort?'&sort='+searchPara.sort:''),(searchPara.tag?'&tag='+searchPara.tag:''));
        //console.log(encodeURIComponent('新娘捧花'));
        $('#pagination').twbsPagination({
            totalPages: totalPages||1,
            visiblePages: (function(){
                if(totalPages>7){
                    return 7;
                }else{
                    return totalPages||1;
                }
            }()) ,
            first : '<<',
            prev :'<',
            next :'>',
            last:'>>',
            //href: `?tag=${searchPara.tag||''}&page={{number}}` ,
            href: '?page={{number}}'+ (searchPara.keywords?'&keywords='+encodeURIComponent(searchPara.keywords):'')+ (searchPara.r?'&r='+searchPara.r:'')+"#tab",
        });

    }
    function resizeLogo(){

        //console.log($("#company-list img").naturalHeight());
        app.common.resizeLogo("#company-list img",150);


        //var normalHeight;
        //detectHeight(resizeLogo);
        //
        //function resizeLogo(){
        //    $("#company-list img").on('load',function(){
        //        //console.log($(this).naturalHeight());
        //        if($(this).naturalHeight()<150){
        //            $(this).outerHeight(normalHeight);
        //        }
        //
        //    });
        //}
        //
        //function detectHeight(callback){
        //    var cancel=false;
        //    $("#company-list img").on('load',function(){
        //        //console.log($(this).naturalHeight());
        //        if(cancel){return;}
        //        if($(this).naturalHeight()==150){
        //            normalHeight=$(this).height();
        //            if(callback){
        //                callback();
        //            }
        //            cancel=true;
        //        }
        //    });
        //}


    }

    return {
        regionTab: regionTab,
        pagActive:pagActive,
        resizeLogo:resizeLogo,
    }
}());