(function() {

    angular.module('haladrive').controller('profileCtrl', function(API_URL, auth, $http, $scope){


        var vm = this;


        vm.activateChangePassword = false;

        email = auth.getUser().email;

        vm.creds = {};


        vm.creds.email = email;

        vm.attemptPasswordChange = function()
        {
	       	console.log('attempt to change password');
	       	console.log(vm.creds);

	       	

	       	var	url = API_URL+'/api/changepassword';

	       	$http({

	       		url : url,
	       		data : vm.creds,
	       		method : 'PUT'

	       	}).then(passUpdateSuccess, passUpdateError);

	       	function passUpdateSuccess(response)
	       	{
       		
	       		vm.activateChangePassword = false;

	       		var notify = {
                        type: 'success',
                        title: 'Password Updated',
                        content: response.data.message,
                        timeout: 3000 //time in ms
                    };
                    $scope.$emit('notify', notify);

	       	}
	       	function passUpdateError(response)
	       	{

	       		var notify = {
                        type: 'error',
                        title: 'Password Updated Failed',
                        content: response.data.message,
                        timeout: 3000 //time in ms
                    };
                    $scope.$emit('notify', notify);
	       		
	       	}

        }



    });

})();
