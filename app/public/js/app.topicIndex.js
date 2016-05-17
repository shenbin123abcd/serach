app.topicIndex=(function(){
    "use strict";
    var searchPara = hb.location.url("?") || {};

    function pagActive(){
        //$(".pagination-item>li>a").on("click",function(event){
        //
        //    event.preventDefault();
        //    $(".pagination-item>li>a").removeClass("active");
        //    $(this).addClass("active");
        //})
        var totalPages=Math.ceil(appData.total/appData.per_page);
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
            href: '?page={{number}}',
        });
    }


    var alignCenter=function(wrapper,inner){
        var wrapperWidth=parseInt($("."+wrapper).css("width"));
        var innerWidth=parseInt($("."+inner).css("width"));
        var num=((wrapperWidth-innerWidth)/2);
        $("."+inner).css("position","relative").css("left",num);
    };


    var topicEllipsis=function(){
        $('#topic-list-v2').find("[topic-des]").hb_ellipsis();


    };

    return{
        alignCenter:alignCenter,
        topicEllipsis:topicEllipsis,
        pagActive:pagActive
    };
}())