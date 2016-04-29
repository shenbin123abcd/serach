(function(){
    "use strict";
    angular.module('halo')
        .controller('authCtrl', ['$rootScope','$scope', '$timeout','$stateParams','$q', '$location','companyService',
            function($rootScope,$scope, $timeout,$stateParams,$q, $location,companyService) {
                $scope.vm={};
                var vm=$scope.vm;

            }
        ])
        .controller('authSearchCtrl', ['$rootScope','$scope', '$timeout','$stateParams','$q', '$location','companyService',
            function($rootScope,$scope, $timeout,$stateParams,$q, $location,companyService) {
                $scope.vm={};
                var vm=$scope.vm;
                vm.searchPara={};
                vm.c_per_page=20;
                vm.selectedId=undefined;

                vm.getCompanys=function(data){
                    data.keywords=data.keywords||'';
                    companyService.search(data).then(function(res){
                        vm.data=res.data;
                    },function(res){
                        app.index.DIALOG.error(res);

                    })
                };
            }
        ])
        .controller('authApplyCtrl', ['$rootScope','$scope', '$timeout','$stateParams','$q', '$location','companyService','jcropModal','regionService',
            function($rootScope,$scope, $timeout,$stateParams,$q, $location,companyService,jcropModal,regionService) {
                $scope.vm={};
                var vm=$scope.vm;
                vm.currentStep=1;
                vm.step=['填写个人信息','上传文件证明','申请认证成功'];
                if(!$stateParams.id){
                    vm.step.unshift('填写商户信息');
                    vm.currentState='create';
                    vm.companyData={};
                }else{
                    vm.currentStep=2;
                    vm.currentState='apply';
                    companyService.getInfo($stateParams.id).then(function(res){
                        vm.companyData=res.data;
                    },function(res){
                        app.index.DIALOG.error(res);
                    })
                }


                vm.region=_.values(region);
                //console.log(vm.region);

                vm.applyData={};


                vm.openJcropModel=function(){
                    jcropModal.open().result.then(function (imgData) {
                        //console.log(imgData);
                        vm.companyData.logo=imgData;

                    });
                };
                vm.getChildren=function(id){
                    vm.region_level3=[];
                    if(!id){
                        return
                    }
                    regionService.getChildren({
                        pid:id
                    }).then(function (res) {
                        vm.region_level3=res.data;
                    });
                };

                vm.idCardLayerInfoOptions={
                    url:'http://up.qiniu.com',
                    formData:{
                        token:hb.Cookies.getJSON('avatar_token')||'m_bQ6vCqK-1n_myddynLMQxg0rxw3YqRptv5D7_i:vCIekJzZo2aWArOxYqBgPdStgrw=:eyJzY29wZSI6ImhhbG9hdmF0YXIiLCJkZWFkbGluZSI6MTQ2MzI4NjkzNywic2F2ZUtleSI6ImF2YXRhclwvdGVtcFwvJCh5ZWFyKSQobW9uKVwvJHtkYXl9XC8kKGV0YWcpJChzdWZmaXgpIiwiY2FsbGJhY2tVcmwiOiJodHRwOlwvXC9jb2xsZWdlLmhhbG9iZWFyLmNvbVwvYXBpXC9xaW5pdVVwbG9hZCIsImNhbGxiYWNrQm9keSI6ImtleT0kKGtleSkmdz0kKGltYWdlSW5mby53aWR0aCkmaD0kKGltYWdlSW5mby5oZWlnaHQpJmZuYW1lPSQoZm5hbWUpJmZzaXplPSQoZnNpemUpJmZpbGV0eXBlPSR7eDpmaWxldHlwZX0mY29kZT0ke3g6Y29kZX0mbW9kdWxlPWF2YXRhclwvdGVtcCJ9'
                    },
                    singleFileUploads:true,
                    autoUpload: true,

                    done: function (e, data) {
                        vm.applyData.idCardLayerInfo=data.result.url;
                    },
                    fail: function (e, data) {
                        console.log('fail', data);
                    },
                    progressall: function (e, data) {

                    },
                };


                vm.certificationOptions={
                    url:'http://up.qiniu.com',
                    formData:{
                        token:hb.Cookies.getJSON('avatar_token')||'m_bQ6vCqK-1n_myddynLMQxg0rxw3YqRptv5D7_i:vCIekJzZo2aWArOxYqBgPdStgrw=:eyJzY29wZSI6ImhhbG9hdmF0YXIiLCJkZWFkbGluZSI6MTQ2MzI4NjkzNywic2F2ZUtleSI6ImF2YXRhclwvdGVtcFwvJCh5ZWFyKSQobW9uKVwvJHtkYXl9XC8kKGV0YWcpJChzdWZmaXgpIiwiY2FsbGJhY2tVcmwiOiJodHRwOlwvXC9jb2xsZWdlLmhhbG9iZWFyLmNvbVwvYXBpXC9xaW5pdVVwbG9hZCIsImNhbGxiYWNrQm9keSI6ImtleT0kKGtleSkmdz0kKGltYWdlSW5mby53aWR0aCkmaD0kKGltYWdlSW5mby5oZWlnaHQpJmZuYW1lPSQoZm5hbWUpJmZzaXplPSQoZnNpemUpJmZpbGV0eXBlPSR7eDpmaWxldHlwZX0mY29kZT0ke3g6Y29kZX0mbW9kdWxlPWF2YXRhclwvdGVtcCJ9'
                    },
                    singleFileUploads:true,
                    autoUpload: true,

                    done: function (e, data) {
                        vm.applyData.certification=data.result;
                    },
                    fail: function (e, data) {
                        console.log('fail', data);
                    },
                    progressall: function (e, data) {

                    },
                };




            }
        ])

}());
