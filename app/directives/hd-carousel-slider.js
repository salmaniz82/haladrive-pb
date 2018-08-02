
    


    /*

    .directive('hdCarouselSlider', function() {

        return {

            restrict: 'A',
            transclude: false,
            link: function(scope, ele, attr, ngModel)
            {
                setTimeout(function(){

                    ele.carousel({
                        fullWidth: true,
                        indicators: true
                    });
                    
              
                }, 300);
                

            }

        };

    });

    */

        angular.module('haladrive').directive("hdCarouselSlider", ["$timeout", function($timeout){
            return {
                restrict: 'A',
                scope: {
                    duration: '@',
                    dist: '@',
                    shift: '@',
                    padding: '@',
                    fullWidth: '@',
                    indicators: '@',
                    noWrap: '@'
                },
                link: function(scope, element, attrs) {

                    

                    element.addClass("carousel");

                    $timeout(function(){

                            console.log('wait before doing this');

                        element.carousel({
                            duration: (angular.isDefined(scope.duration)) ? scope.duration : 200,
                            dist: (angular.isDefined(scope.dist)) ? scope.dist : -100,
                            shift: (angular.isDefined(scope.shift)) ? scope.shift : 0,
                            padding: (angular.isDefined(scope.padding)) ? scope.padding : 0,
                            fullWidth: (angular.isDefined(scope.fullWidth)) ? scope.fullWidth : true,
                            indicators: (angular.isDefined(scope.indicators)) ? scope.indicators : true,
                            noWrap: (angular.isDefined(scope.noWrap)) ? scope.noWrap : false
                        });

                        


                    }, 3000);
                }
            };
        }]);






