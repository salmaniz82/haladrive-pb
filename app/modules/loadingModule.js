angular.module('loadingStatus', [])
 
.config(function($httpProvider) {
  $httpProvider.interceptors.push('loadingStatusInterceptor');
})
 
.directive('loadingStatusMessage', function() {
  return {
    link: function($scope, $element, attrs) {
      var show = function() {
        $element.css('display', 'block');
      };
      var hide = function() {
        $element.css('display', 'none');
      };
      $scope.$on('loadingStatusActive', show);
      $scope.$on('loadingStatusInactive', hide);
      hide();
    }
  };
})
 
.factory('loadingStatusInterceptor', function($q, $rootScope) {
  var activeRequests = 0;
  var started = function() {
    if(activeRequests==0) {
      $rootScope.$broadcast('loadingStatusActive');
    }    
    activeRequests++;
  };
  var ended = function() {
    activeRequests--;
    if(activeRequests==0) {
      $rootScope.$broadcast('loadingStatusInactive');
    }
  };
  return {
    request: function(config) {
      started();
      return config || $q.when(config);
    },
    response: function(response) {
      ended();
      return response || $q.when(response);
    },
    responseError: function(rejection) {
      ended();
      return $q.reject(rejection);
    }
  };
});