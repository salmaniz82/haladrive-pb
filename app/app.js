(function(){
	
    function apiUrl()
    {
      return (location.hostname == 'mobile.haladrive.com') ? 'https://api.haladrive.com' : 'http://api.haladrive.local';
    }


    angular.module('haladrive', ['ui.router', 'loadingStatus', 'angularNotify', 'localytics.directives'])
       .constant("API_URL", apiUrl());
})();





angular.module('haladrive').run(['$rootScope','$state', function ($rootScope, $state, $window) {

    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams, options, $window) {

      if($state.name != 'cars')
      {
        document.getElementsByTagName("body")[0].removeAttribute("scroll");
        angular.element($window).unbind('scroll');
        angular.element($window).unbind('resize');
      }

        

    });


    $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {


      if($state.name != 'cars')
      {
        document.getElementsByTagName("body")[0].removeAttribute("scroll");
        angular.element($window).unbind('scroll');
        angular.element($window).unbind('resize');
      }

        
    });

    $rootScope.$on('$stateChangeError', function(e, toState, toParams, fromState, fromParams, error) {
       

      if(error == 'Un Authorized')
      {
        $state.go('app.dashboard');
      }

      e.preventDefault();

    });

}]);

