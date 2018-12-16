(function(){
	angular.module('haladrive')
	.controller('authAppCtrl', function($state, auth){

		vm = this;

		if(!auth.isLoggedIn() )
		{
			$state.go('ua.login');
		}

		var allowedRoles = [4];
		var roleID = auth.getUser().role_id;
		roleID = parseInt(roleID);


		if( ( auth.isLoggedIn() ) && ( roleID !== 4) )
		{
			$state.go('app.logout');
		}


		console.log('auth app controller is activated');

	});

})();