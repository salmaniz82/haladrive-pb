(function(){
    angular.module('haladrive')

    .directive('datePicker', function() {

        return {

            restrict: 'C',
            link: function(scope, ele, attr, ngModel)
            {
                ele.pickadate({
                    min: true,
                    format: 'yyyy-mm-dd',
                    selectMonths: true, // Creates a dropdown to control month
                    selectYears: 15, // Creates a dropdown of 15 years to control year,
                    today: 'Today',
                    clear: 'Clear',
                    close: 'Ok',
                    closeOnSelect: true // Close upon selecting a date,
                });
            }

        };





    });

})();