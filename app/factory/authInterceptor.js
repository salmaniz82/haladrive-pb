angular.module('haladrive')
	.factory('authInterceptor', function() {

		oAuthIntercept = {};

		oAuthIntercept.request = function(config) {

			config.headers = config.headers || {};

			if(localStorage.auth_token)
			{
				config.headers.token = localStorage.auth_token;
			}

			return config;

		};

		return oAuthIntercept;


	})

	.config(function($httpProvider) {

    	$httpProvider.interceptors.push('authInterceptor');

    });

    
	
