app.pictureIndex=(function(){
    "use strict";
    var searchPara=hb.location.url('?')||{};
    //console.log(searchPara)

    var tab=function(){
        $("a.category").on("click",function(event){
            var id=$(this).attr("id");
            event.preventDefault();
            $("a.category").removeClass("active");
            $(this).addClass("active");
            $(".tab-list-content").removeClass("show");
            if(id=="category-color"){
                $("#content-color").addClass("show");
            }else if(id=="category-element"){
                $("#content-element").addClass("show");
            }else if(id=="category-classify") {
                $("#content-classify").addClass("show");
            }
        })
    };

    function pagActive(){
        //$(".pagination-item>li>a").on("click",function(event){
        //
        //    event.preventDefault();
        //    $(".pagination-item>li>a").removeClass("active");
        //    $(this).addClass("active");
        //})
        var totalPages=Math.ceil(appData.total/appData.per_page);
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
            href: '?page={{number}}'+(searchPara.sort?'&sort='+searchPara.sort:'')+ (searchPara.tag?'&tag='+encodeURIComponent(searchPara.tag):'')+"#tab",
        });
    }
    function scrollToTab(){
        $(window).on('load',function(){
            //console.log(hb.location.url('hash'))
            console.log($(window).scrollTop());
            var hash=hb.location.url('hash');
            if(hash=='tab'){
                $(window).scrollTop($(window).scrollTop()+44);
            }
        })
    }

    return {
        tab:tab,
        pagActive:pagActive,
        scrollToTab:scrollToTab,
    };

}());