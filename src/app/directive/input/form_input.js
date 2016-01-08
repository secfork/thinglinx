

 


export  default (  )=>{
	"ngInject";
 
	return  {
		restrict:"A", 
		require: 'ngModel',
		link:( scope , ele , attrs , modelCtrl )=>{
			var  label = ' <label class= " col-sm-3 control-label " > '+ attrs.label +' </label> ' ,
				 wrap_input = '<div class="form-group"><div class="col-sm-8"></div></div> ' ;


			ele.addClass(  ele.is("input , textarea ,select")?"form-control" : " no-border")
			// ele.addClass(  "form-control" )
				.wrap( wrap_input)
				.parent().before( label );

 
		}

	}

} 