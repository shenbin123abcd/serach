app.companyDetail=(function(){
    "use strict";

    function toggleCases(){

        $('#expand-more').on('shown.bs.collapse', function () {
            $("#rest-cases-toggle__bt").html(`
            <span class="text">收起</span> <i class="glyphicon glyphicon-menu-up"></i>
            `);
        });

        $('#expand-more').on('hidden.bs.collapse', function () {
            $("#rest-cases-toggle__bt").html(`
            <span class="text">展开</span> <i class="glyphicon glyphicon-menu-down"></i>
            `);
        });
    }



    return {
        toggleCases:toggleCases,
    }
}());