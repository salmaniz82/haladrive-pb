app = angular.module('haladrive');

app.directive("scroll", function ($window) {
    return function(scope, element, attrs) {
      
        angular.element($window).bind("scroll", function() {
            if (this.pageYOffset >= 300) {

                $("#topmenu").addClass("SiteChromeHeader__detached");
                
             } else {

                $("#topmenu").removeClass("SiteChromeHeader__detached");
                 
             }

            scope.$apply();
        });


        angular.element($window).bind("resize", function() {

            console.log('yes I am resized , tell me what to do');

        });




    };
});