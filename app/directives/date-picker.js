(function(){


    angular.module('haladrive').directive("datepicker", function () {
          return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, elem, attrs, ngModelCtrl) {

              console.log(attrs.message);

              var updateModel = function (dateText) {
                scope.$apply(function () {
                  ngModelCtrl.$setViewValue(dateText);
                });
              };
              var options = {
                dateFormat: "yy-mm-dd",
                minDate: new Date(),
                onSelect: function (dateText) {
                  updateModel(dateText);
                }
              };
              elem.datepicker(options);
            }
          }
        })
    

    

})();