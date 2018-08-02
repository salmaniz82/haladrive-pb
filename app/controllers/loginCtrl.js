(function(){
	angular.module('haladrive')

	.controller('loginCtrl', function ($state, auth, API_URL){


		
		var vm = this;

		vm.loginStatus = null;
		vm.wrongCreds = null;


		if(localStorage.getItem('auth_token'))
		{
			$state.go('app.dashboard');
		}

		
		vm.login = function() 
		{		
			 var promise  = auth.login(vm.creds);
			 promise.then(success, error);

		};


		var success = function(response){
			console.log('success ran');

			vm.loginStatus = true;
			vm.wrongCreds = false;

			// console.log(response.data.token[0].token);

            var auth_token = null;

			if(response.data.token != undefined)
			{
				auth_token = response.data.token;
                localStorage.setItem('auth_token', auth_token);
                var user = response.data.user;

                var hdAuthUser = JSON.stringify(user);

                // btoa() encode
                // atob() decode

                hdAuthUser = btoa(hdAuthUser);
                localStorage.setItem('hdauEn', hdAuthUser);

				auth.getUser();

			}

			$state.go('app.dashboard');

		};
		var error = function(response){
			console.log('error ran');

			vm.loginStatus = false;
			vm.wrongCreds = true;
		};





	});



})();