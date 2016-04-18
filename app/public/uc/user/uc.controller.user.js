(function(){
    "use strict";
    angular.module('halo')
        .controller('settingCtrl', ['$rootScope','$scope', '$timeout','$stateParams','$q', '$location','userService',
            function($rootScope,$scope, $timeout,$stateParams,$q, $location,userService) {
                $scope.vm={};
                var vm=$scope.vm;
                userService.getInfo();



            }])

}());
