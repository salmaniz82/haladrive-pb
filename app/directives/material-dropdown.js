(function(){
    angular.module('haladrive')

    .directive('dropdownButton', function() {

    return {
        restrict : 'C',
        link : function(scope, ele, attr, ngModel){

            ele.bind('click', function(e) {

            ele.dropdown({belowOrigin: true});

            e.preventDefault();

            });

            /*
            ele.dropdown({

                belowOrigin: true, // Displays dropdown below the button

              inDuration: 300,
              outDuration: 225,
              constrainWidth: false, // Does not change width of dropdown to that of the activator
              hover: true, // Activate on hover
              gutter: 0, // Spacing from edge
              belowOrigin: false, // Displays dropdown below the button
              alignment: 'left', // Displays dropdown with edge aligned to the left of button
              stopPropagation: false // Stops event propagation

            });

             */


        
            }
    
    };





});




})();