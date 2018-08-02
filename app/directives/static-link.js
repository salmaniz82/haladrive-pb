(function(){
    angular.module('haladrive')

    .directive('a', function() {

    vm = this;

    return {
        restrict : 'E',
        link : function(scope, ele, attr, ngModel){
            ele.on('click', function(e) {
             e.preventDefault();

            });     
        }
    };


    });
   

})();