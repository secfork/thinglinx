export default ($scope, $sys, $source, modal) => {
    "ngInject";

    var ThatScope  = $scope ; 
    $scope.od = {};

    $scope.page = {};

    $scope.panel = {
        subject: "区域管理",
        title: "区域管理",
        pagger: true,

        panelTBS: [

        ],

        panelBBS: [{
            text: "添加区域",
            classFor: " btn-primary",
            handler:   addProj 
            

        }]
    }; 

    $scope.tableHeaders = [{
        text: "名称",
        w: "20%"
        }, {
            text: "创建时间",
            w: "20%"
        }, {
            text: "已激活系统",
            w: "20%"
        }, {
            text: "未激活系统",
            w: "20%"
        }, {
            text: "备注",
            w: "30%"
        }, {
            text: "删除",
            w: "15%"
        }]

    $scope.loadPageData = function(pageNo) {
        $scope.showMask = true;

        var d = {
            itemsPerPage: $sys.itemsPerPage,
            currentPage: pageNo,
            name: $scope.od.f_projname
        };

        $source.$region.query(d, function(resp) {
            $scope.showMask = false;
            $scope.page = resp;
            $scope.page.currentPage = pageNo;

        }, function() {
            $scope.showMask = false;
        });
    };



    $scope.loadPageData(1);

    var region_ids = [];
    $scope.collectRegionId = function(region, $last) {
        region_ids.push(region.id);

        if ($last) {

            getActiveSum(region_ids);
            getUnActiveSum(region_ids);
        }
    }


    function getActiveSum(region_ids) {
        $source.$region.save({
            pk: "sum",
            state: 1
        }, region_ids, function(resp) {
            resp.ret.forEach(function(v, i) {
                $("#act_" + v.region_id).text(v.count);
            })
        })
    }


    function getUnActiveSum(region_ids) {
        $source.$region.save({
            pk: "sum",
            state: 0
        }, region_ids, function(resp) {
            resp.ret.forEach(function(v, i) {
                $("#unact_" + v.region_id).text(v.count);
            })
        })
    }



    /*
     * 从 fps 中移除, 从 filterP 中移除;   从 allprojects 中移除;
     * */
    $scope.delProject = function(proj, index) {

        $scope.confirmInvoke({
                title: "删除区域: " + proj.name,
                note: "确认要删除该区域吗?"
            },
            function(next) {
                $source.$region.delete({
                    pk: proj.id
                }, function(resp) {

                    $scope.page.data.splice(index, 1);

                    next();
                }, next)
            }
        )
    }

   
    function addProj() {

        modal({
            title: "添加区域",
            templateUrl: "app/main/m_region/add_region.html"

        }, ($scope) => {
            "ngInject";

            $scope.done=function( ){ 

                $scope.validForm();

                $scope.showMask = true ;

                $source.$region.save($scope.proj, function(resp) {
                    //resp.ret && $state.go("app.proj.manage");  
                    $scope.showMask = false ; 

                    $scope.proj.id = resp.ret ; 

                    ThatScope.page.data.unshift( angular.copy( $scope.proj));
                    $scope.cancel(); 
                },function(){  
                    
                   $scope.showMask = false;  
               })


            }


        });

    }

 


    function addProjx( x ) {
        alert(123)

        return ;

        $modal.open({
            templateUrl: "athena/region/project_add_temp.html",
            controller: function($scope, $modalInstance) {
                $scope.__proto__ = thatScope;
                $scope.$modalInstance = $modalInstance;
                $scope.proj = {};

                $scope.done = function(e) {
                    console.log(e)
                    $scope.validForm();

                    $scope.showMask = true;
                    $source.$region.save($scope.proj, function(resp) {
                        //resp.ret && $state.go("app.proj.manage");
                        $scope.showMask = false;
                        $scope.proj.id = resp.ret;

                        $scope.page.data.unshift(angular.copy($scope.proj));
                        $scope.cancel();

                        //  angular.alert("添加成功!");
                    }, function() {
                        $scope.showMask = false;
                    })


                }
            }
        })

    }

    $scope.updateRegion = function(fieldObj) {

        return $source.$region.put({
            pk: fieldObj.id
        }, fieldObj).$promise;
    }



    //======================================

}
