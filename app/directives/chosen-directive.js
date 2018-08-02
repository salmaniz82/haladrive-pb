angular.module('haladrive').directive('chosen', function(){

    var directive = {};

    directive.restrict = 'A';


    directive.link = function(scope, element, attrs) {

        /*

        var list = attrs['chosen'];

        scope.$watch(list, function () {
            element.trigger('chosen:updated');
        });

        scope.$watch(attrs['ngModel'], function() {
            element.trigger('chosen:updated');
        });

        */

     //   element.chosen();
    };

    return directive;
});