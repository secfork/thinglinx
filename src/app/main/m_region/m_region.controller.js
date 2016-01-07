 export default ($scope) => {
 	"ngInject";


    $scope.panel = {
        subject: "区域管理",
        title: "区域管理",
        pagger: true,

        panelTBS: [

        ],
        panelBBS: [
         	{  text:"添加区域",
         	   classFor: " btn-primary",
         	   handler:  null ,

         	}
        ]
    };

    $scope.op = {xx:123}

    $scope.click= (a)=>{
        alert(a)
    }

    $scope.tableHeaders =  [
    		 { text:"名称" , w:"20%"   } ,
    		 { text:"创建时间" , w:"20%"} ,
    		 { text:"已激活系统" , w:"20%"} ,
    		 { text:"未激活系统" , w:"20%"} ,
    		 { text: "备注", w:"30%"},
    		 { text:"删除", w:"5%" } 
    	]
    


   


 }
