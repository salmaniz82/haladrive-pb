(function(){
    angular.module('haladrive')

    .directive('buttonCollapse', function() {

        return {

            restrict: 'C',
            link: function(scope, ele, attr, ngModel)
            {
                ele.sideNav();

                ele.on('click', function(e) {

                    e.preventDefault();

                });
            }

        };


    });

})();