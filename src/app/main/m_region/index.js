
// import regionCtrl from  "m_region.controller";

 
export  default  {

	initCtrl :  ( module )=>{
		// module.controller( "m_region_ctrl" ,  regionCtrl )
	} ,

	route: ( module )=>{ 
		module.config( ( $stateProvider )=>{
			"ngInject";
			$stateProvider.state( "app.m_region" , {
				url:"/m_region",
				templateUrl:"app/main/m_region/m_region.html",
				controller:"m_region_ctrl"
			})


		}); 
	}



}