(function(){
    angular.module('haladrive')

    .directive('timePicker', function() {

        return {

            restrict: 'C',
            link: function(scope, ele, attr, ngModel)
            {
                ele.pickatime({
                    default: 'now',
                    fromnow: 3000,       // set default time to * milliseconds from now (using with default = 'now')
                    twelvehour: true, // Use AM/PM or 24-hour format
                    donetext: 'OK', // text for done-button
                    cleartext: 'Clear', // text for clear-button
                    canceltext: 'Cancel', // Text for cancel-button
                    autoclose: true, // automatic close timepicker
                    ampmclickable: true, // make AM PM clickable
                    aftershow: function(){} //Function for after opening timepicker
                });
            }

        };





    });

})();