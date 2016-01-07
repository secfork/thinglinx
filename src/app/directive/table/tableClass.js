
export default ()=>{
	"ngInject";

	return {
		restrict:"A" ,   
		link: ( scope , ele , attrs )=>{
			// console.log( scope.table )
			ele.addClass("table table-hover table-striped  b-t");

		}
	}

}