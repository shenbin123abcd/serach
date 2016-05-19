(function(){
    "use strict";
    angular.module('halo')
        .controller('userCtrl', ['$rootScope','$scope', '$timeout','$stateParams','$q', '$location','userService',
            function($rootScope,$scope, $timeout,$stateParams,$q, $location,userService) {
                $scope.vm={};
                var vm=$scope.vm;
                vm.c_data={
                    greet:moment().format('a')
                };
                //console.log(moment().utcOffset(8))
                //console.log(moment('2016-01-01 12:00').format('a'))
                //console.log(moment('2016-01-01 14:00').format('a'))
                //console.log(moment('2016-01-01 10:00').format('a'))
                userService.getInfo().then(function(res){
                    vm.data=res.data;
                    vm.data.avatar=vm.data.avatar+'?_='+$rootScope.newBust;

                });
            }])
}());
