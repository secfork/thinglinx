export default () => {

    "ngInject";
    return {
        restrict: "A", 
        link: (s, e ,a )=>{
        	e.addClass("row m-l-xs m-r-xs m-t");
        }

    }
}
