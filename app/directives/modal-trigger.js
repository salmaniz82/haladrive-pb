(function(){
    angular.module('haladrive')

    .directive('modalTrigger', function() {

        return {

            restrict: 'C',
            link: function(scope, ele, attr, ngModel)
            {
                ele.bind('click', function(e) {

                    console.log(attr.href);

                    var targetModel = angular.element( document.querySelector( attr.href ) );
                    targetModel.modal();

                    e.preventDefault();

                });
            }

        };





    });

})();