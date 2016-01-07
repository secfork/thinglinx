export default ( $resource )=>{
	"ngInject";

    var live = angular.rootUrl + "show/live/:uuid",
        liveWrite = angular.rootUrl + 'show/livewrite/:uuid', // uuid = system uid ;
        // his = angular.rootUrl + "show/history/:uuid",   // uuid = system uid ;
        his = angular.rootUrl + "line/:uuid/:method",   // uuid = system uid ;
        alarm = angular.rootUrl + "show/alarm/:uuid/:op";   // uuid = system uid ;

 
    this.live = $resource(live);
    this.his = $resource(his);

    this.alarm = $resource(alarm , {},{
        conform: { method:"POST" , params:{uuid:"confirm"}   },
        getConformMsg: { params: {uuid:"confirm"}    }
    });
    this.liveWrite = $resource(liveWrite); // 下置; 


}