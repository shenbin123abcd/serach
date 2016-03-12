app.companyIndex=(function(){
    "use strict";
    var regionTab=function(){
        $('.city-list>li>a').on("click", function (event) {
            var _this = this;
            event.preventDefault();
            $('.city-list>li>a').removeClass("active");
            $('.area-list').html();
            $(this).addClass("active");
            $.getScript("http://localhost:9000/app/public/js/region.js", function (data) {
                var selectedId = $(_this).attr("data-id");
                var html = "";
                var arr = [];
                $.each(region, function (index, val) {
                    if (selectedId === val.parent_id) {
                        arr.push(region[index].region_name);
                    }
                })
                for (var i = 0; i < arr.length; i++) {
                    html += '<li><a href="">' + arr[i] + '</a></li>';
                }
                $(".area-list").html(html);
            })
        })
    }
    return {
        regionTab: regionTab
    }
}());