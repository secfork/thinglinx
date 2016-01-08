
 

export default ( $compile )=>{
	"ngInject";

	return {
		restrict:"A" , 
		// scope:true ,   
		// replace:true ,
		// priority: 1000 ,
		// multiElement:true ,
		// templateNamespace:"html",
		// transclude:true , 
		// templateUrl:"app/directive/table/table.html",

		link: ( scope , ele , attrs , ctrl  )=>{
					

			var  html =  [' <thead class="flip-content">  <tr class="background "> ']  ; // angular.copy( headerHtml);
			
			scope[ attrs.theader ].forEach( (v , i )=> {
			 	html.push("<th  width= '"+v.w+"'> "+v.text+" </th>")
			}) ; 

			html.push(" </tr></thead>") ;  
 
		    ele.addClass("table table-hover table-striped  b-t").prepend(  html.join('') );


 


		}
	}

}