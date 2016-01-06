angular.module('thinglinxApp')

/**


*/
 
.directive("tlPanel" , ( $compile )=>{
	
	return {
		restrict:"E",  
		transclude:true,
		templateUrl:"components/directive/panel/panel.html",
		link:( scope , ele , attrs )=>{

		}
	}

	
})