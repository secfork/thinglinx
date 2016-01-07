export default  ( $compile )=>{
	'ngInject';

	return {
		restrict:"E",
		transclude:true ,
		templateUrl:"app/directive/panel/panel.html",
		link:( scope , ele, attrs ,  ctrl , transclude  )=>{

		 		 
			transclude(  function(  cloneLinkFn ,futureParentElement ){

				console.log( 8888888888, cloneLinkFn , futureParentElement )
			})

		}
	}

}