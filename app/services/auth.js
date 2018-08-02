angular.module('haladrive')
	.service('auth', function($http, API_URL) {

		this.login = function(creds)
		{

			var loginUrl = API_URL+'/jwt/login';
			
			return $http.post(loginUrl, {'email': creds.email, 'password': creds.password});
		};

		

		this.logout = function()
		{

			localStorage.removeItem('auth_token');
            localStorage.removeItem('hdauEn');

		};

		this.getUser = function()
		{
			if(this.hastokenAndUser())
			{
                var user = localStorage.getItem('hdauEn');
                user = atob(user);
                return  user = JSON.parse(user);
			}
		};

		this.hastokenAndUser = function()
		{
			if(localStorage.hasOwnProperty('auth_token') && localStorage.hasOwnProperty('hdauEn'))
			{
				return true;
			}
			else {
				return false;
			}
		};


		this.isLoggedIn = function()
		{
			if(localStorage.getItem('auth_token'))
			{
				return true;
			}
			else 
			{
				return false;
			}
		};


		
	});