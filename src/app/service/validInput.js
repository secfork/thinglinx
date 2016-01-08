export default ($compile , $sys ) => {

    "ngInject"

    return ( $scope, $ele, $attrs, modelCtrl) => {

        $scope.m = modelCtrl;

        function v(type, value) {
            var msg = $translate.instant("valid." + type);
            if (value) {
                msg = msg.replace("X", value);
            }

            $ele.after(
                $compile("<p class='text-danger m-n " + type + " '   ng-if=' m.$dirty &&  m.$error." + type + "' >" + msg + " </p>")($scope)
            );

        }

        if ($attrs.required ) {
            if ($attrs.type) { 

                $ele.after(
                    $compile("<p class='text-danger' ng-if=' m.$dirty &&  m.$error.required' >" +
                     "该字段不能为空!", 
                     + " </p>")($scope)
                );
            } else {
                v("required");
            }
        } else {
            // return ; // 无required ; 其他的就不验证了; 
        };



        if ($attrs.type ) {
            v($attrs.type)
        }


        if ($attrs.max) {
            v("max", $attrs.max);
        }

        if ($attrs.min) {
            v("min", $attrs.min);
        }

        if ($attrs.ngMinlength) {
            v("minlength", $attrs.ngMinlength);
        }
        if ($attrs.ngMaxlength) {
            v("maxlength", $attrs.ngMaxlength);
        }

    }


}
