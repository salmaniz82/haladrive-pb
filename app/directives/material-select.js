(function(){
    angular.module('haladrive')

    .directive('select', function($timeout) {

    return {

        restrict : 'E',
        link : function(scope, ele, attr, ngModel){

            scope.$watch('globalLoaded', function(val) {

                if(val == true)
                {
                    $timeout(function(){
                        ele.material_select();

                    }, 100);
                }

            });


            }
    
    };


});


})();