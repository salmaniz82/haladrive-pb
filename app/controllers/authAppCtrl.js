(function(){
	angular.module('haladrive')
	.controller('authAppCtrl', function($state, auth){

		vm = this;


		vm.message = "hello";

		vm.appMenu = false;


		vm.toggleMenu = function()
		{

			vm.appMenu =! vm.appMenu;
			
		}




		if(!auth.isLoggedIn() )
		{
			$state.go('pub.list');
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