app.companyIndex=(function(){
    "use strict";
    var searchPara = hb.location.url("?") || {};
    var regionTab=function(){
        //console.log(region);
        var htmlStr = '';
        var level,parent_id;

        $.each(region,(i,n)=> {
            if(appData.query.r==n.region_id){
                level=Number(n.level);
                parent_id=Number(n.parent_id);
            }

        });

        switch(level){
            case 1:
                $.each(region,(i,n)=> {
                    if(appData.query.r==n.parent_id){
                        htmlStr += `
                        <li><a href="?r=${n.region_id}" >${n.region_name}</a></li>
                    `;
                    }
                });
                $("#area-list-level-2").empty().append(htmlStr);
                break;
            case 2:

                $.each(region,(i,n)=> {
                    if(parent_id==n.parent_id){
                        htmlStr += `
                        <li><a href="?r=${n.region_id}" class="${(appData.query.r==n.region_id)&&'active'}"  >${n.region_name}</a></li>
                    `;
                    }
                });

                $(`#area-item-${parent_id}`).addClass('active');
                $("#area-list-level-2").empty().append(htmlStr);
                break;
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
        $('#pagination').twbsPagination({
            totalPages: 15,
            visiblePages: 5 ,
            first : '<<',
            prev :'<',
            next :'>',
            last:'>>',
            href: `?keyword=${searchPara.keyword||''}&page={{number}}` ,
        });

    }

    return {
        regionTab: regionTab,
        pagActive:pagActive,
    }
}());