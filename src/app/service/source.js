export default ($resource) => {
    "ngInject";

    function $createSource(url, config1, config2) {
        return $resource(angular.rootUrl + url, config1, config2);
    }


    this.$deviceModel = $createSource("devmodel/:pk");
    this.$dmPoint = $createSource("devmodel/points/:pk");
    this.$sysProfile = $createSource("profile/:pk");
    this.$sysLogTag = $createSource("profile/tags/:pk");
    this.$sysTag = $createSource("sysmodel/tags/:pk");
    this.$sysProfTrigger = $createSource("profile/triggers/:pk");
    this.$sysModel = $createSource("sysmodel/:pk");
    this.$sysDevice = $createSource("sysmodel/devices/:pk");
    this.$message = $createSource("sysmodel/messages/:pk");
    this.$contact = $createSource( "system/contacts/:pk" );
    this.$region = $createSource( "region/:pk/:op" );
        
        // account/admin?uuid 来判断 uuid is Exist
    this.$account = $createSource( "account/:pk" );

    this.$role = $createSource("role/:pk");
    this.$driver = $createSource("driver/:type");
    this.$sub    =  $createSource("subscribe/:pk/:op");

    // http://faefae.com/:id/crate , { id:123}
    
    //    sou: connent( sys联系人) , user( 用户) , 
    //  ? send : cell_phone , verify: code ;  
    this.$note = $createSource("sms/:op/:sou"); 

    this.$common = $createSource("common/:op", {}, {
        // 验证 uuid ; 
        verifyUuid:{
            params:{op:"vuuid"}
        } ,

       // 验证 图片验证码; 
        verify: {
            url: angular.rootUrl +"common/verify"
        }

    });

    this.$user = $createSource("user/:pk/:op", {}, {
        login: {
            url: angular.rootUrl + "common/login",
            method: "POST"
        },
        logout: {
            url:angular.rootUrl + "user/logout"
        }
    });
    
    /// {pk:"@pk", userid:"@userid"} ,
    this.$userGroup = $createSource("usergroup/:pk/:userid" ,  {}, {
          queryUser :{ url: angular.rootUrl + "usergroup/:pk/users" },

    });

    this.$ticket = $createSource( "ticket/:system_id");

    this.$system = $createSource("system/:pk/:options/:proj_id", {}, {
        sync: {
            method: "GET", params:{ options:"sync" }
        },
        stop: {
            method: "GET" , params:{ cmd:"stop"}
        },
        start: {
            method: "GET", params:{ cmd:"start"}

        }, 
        call :{
            method:"POST"
        },
        active:{ 
            params:{options:"active"}
        },
        deactive:{
            params:{options:"deactive"}
        },
        assign: {
            params:{options:"assign"}
        }, 
        getDtuServer: {
            method:"GET"
        },

        status: { method:"POST" , params:{ options:"status" } },
        needSync: { method:"POST" ,  params:{options:"needsync" }  }
    });

    // 权限;
    this.$permission = $createSource( "permission/:source/:source_id/:group_id"  )
    


}
