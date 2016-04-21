(function(){
    "use strict";
    angular.module('halo')
        .controller('commentCtrl', ['$rootScope','$scope', '$timeout','$stateParams','$q', '$location','commentService',
            function($rootScope,$scope, $timeout,$stateParams,$q, $location,commentService) {
                $scope.vm={};
                var vm=$scope.vm;
                var listOwner='';
                function init(){
                }
                vm.getList= function(owner){
                    if(listOwner==owner){
                        return
                    }
                    vm.data=undefined;
                    var para={
                        owner:owner,
                    };
                    commentService.getInfo(para).then(function(res){
                        res.data.data.forEach(function(n,i){
                            n.c_time=moment(n.create_time).format('YYYY年MM月DD日HH点mm分');
                            switch (n.module){
                                case 'case':
                                    n.c_link='/case/detail/'+n.record_id;
                                    n.c_msg=`我对婚礼案例<a target="_blank" href="${n.c_link}">${n.title}</a>发表了评论 :`;
                                    break;
                                case 'picture':
                                    n.c_link='/picture/detail/'+n.record_id;
                                    n.c_msg=`我对该婚礼图片发表了评论 :`;
                                    break;
                                case 'zhuanti':
                                    n.c_link='/topic/detail/'+n.record_id;
                                    n.c_msg=`我对婚礼专题<a target="_blank" href="${n.c_link}">${n.title}</a>发表了评论 :`;
                                    break;
                            }

                        });

                        vm.data=res.data;
                        listOwner=owner;
                    });
                };
                vm.delete= function(data){
                    hb.util.loading.show();
                    commentService.delete(data).then(function(res){
                        app.index.DIALOG.success(res.info);
                        hb.util.loading.hide();
                        _.remove(vm.data.data,{id:data.id});
                    },function(res){
                        hb.util.loading.hide();
                        app.index.DIALOG.error(res);
                    });
                };
                init()
            }])
        .controller('commentUserCtrl', ['$rootScope','$scope', '$timeout','$stateParams','$q', '$location','commentService',
            function($rootScope,$scope, $timeout,$stateParams,$q, $location,commentService) {
                $scope.vm.getList('user');
            }])
        .controller('commentCompanyCtrl', ['$rootScope','$scope', '$timeout','$stateParams','$q', '$location','commentService',
            function($rootScope,$scope, $timeout,$stateParams,$q, $location,commentService) {
                $scope.vm.getList('company');
            }])
}());
