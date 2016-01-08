export default  ( $compile )=>{
	'ngInject';

	return {
		restrict:"E",
		transclude:true ,
		replace:true ,
		
		templateUrl:"app/directive/panel/panel.html",
		link:( scope , ele, attrs ,  ctrl , transclude  )=>{

		 		 
			transclude(  function(  cloneLinkFn ,futureParentElement ){

				console.log( "tl panel  transclude = ", cloneLinkFn , futureParentElement )
			})

		}
	}

}