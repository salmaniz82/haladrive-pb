(function(){
	
    function apiUrl()
    {
      return (location.hostname == 'haladrive.com') ? 'https://api.haladrive.com' : 'http://api.haladrive.local';
    }


    angular.module('haladrive', ['ui.router', 'loadingStatus', 'angularNotify', 'localytics.directives'])
       .constant("API_URL", apiUrl());
})();





angular.module('haladrive').run(['$rootScope','$state', function ($rootScope, $state) {

    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams, options) {

    });


    $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {

        
    });

    $rootScope.$on('$stateChangeError', function(e, toState, toParams, fromState, fromParams, error) {
       

      if(error == 'Un Authorized')
      {
        $state.go('app.dashboard');
      }

      e.preventDefault();

    });

}]);

