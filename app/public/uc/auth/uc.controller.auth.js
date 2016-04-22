(function(){
    "use strict";
    angular.module('halo')
        .controller('authCtrl', ['$rootScope','$scope', '$timeout','$stateParams','$q', '$location','companyService',
            function($rootScope,$scope, $timeout,$stateParams,$q, $location,companyService) {
                $scope.vm={};
                var vm=$scope.vm;
                vm.searchPara={};


                vm.getCompanys=function(data){
                    data.keywords=data.keywords||'';
                    companyService.getInfo(data).then(function(res){

                    },function(res){
                        app.index.DIALOG.error(res);

                    })
                };




            }])

}());
