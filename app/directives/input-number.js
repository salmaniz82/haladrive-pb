angular.module('directives').directive('input', function() {
  return {
    restrict: 'E',
    require: 'ngModel',
    link: function(scope, $el, attrs, ngModel) {
      if ($el.get(0).type === 'number') {
        ngModel.$parsers.push(function(value) {
          return value.toString();
        });

        ngModel.$formatters.push(function(value) {
          return parseFloat(value, 10);
        });
      }
    }
  }
})