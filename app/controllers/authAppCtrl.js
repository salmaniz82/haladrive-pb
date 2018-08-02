(function(){
	angular.module('haladrive')
	.controller('authAppCtrl', function($state, auth){

		vm = this;

		if(! auth.isLoggedIn() )
		{
			$state.go('ua.login');
		}

		var allowedRoles = [1,3];
		var roleID = auth.getUser().role_id;
		roleID = parseInt(roleID);


		if( ( auth.isLoggedIn() ) && ( roleID !== 1 && roleID !== 3) )
		{
			$state.go('app.logout');
		}

	});

})();