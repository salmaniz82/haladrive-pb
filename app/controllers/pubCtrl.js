(function() {

    angular.module('haladrive').controller('pubCtrl', function(API_URL, auth, $http){
        var vm = this;
        vm.footer = true;

        vm.pageId = '';
        /*
	        details
	        browse
        */


        vm.showAuthModal = false;
        vm.modalType = 'login';

        vm.redirectionToBooking = false;


        vm.bookingModal = false;

        vm.creds = {};

        vm.launchAuthModal = function()
        {
			vm.showAuthModal = true;        	
        }



        vm.validateEmail = function(email)
        {

        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
        
        };


         vm.attemptLogin = function()
        {
            
            

            console.log(vm.creds);

            var promise  = auth.login(vm.creds);
            promise.then(loginSuccess, loginError);


            function loginSuccess(response)
            {
                vm.loginStatus = true;
                vm.wrongCreds = false;

                    var auth_token = null;

                    if(response.data.token != undefined && response.data.user.role_id == 4)
                    {
                        auth_token = response.data.token;
                        localStorage.setItem('auth_token', auth_token);
                        var user = response.data.user;

                        console.log(user.role_id);

                        var hdAuthUser = JSON.stringify(user);

                        // btoa() encode
                        // atob() decode

                        hdAuthUser = btoa(hdAuthUser);
                        localStorage.setItem('hdauEn', hdAuthUser);

                        auth.getUser();

                        if(vm.redirectionToBooking)
                        {
                        	/* 
                        	if redirected from booking 
                        	close auth modal
                        	open the booking modal
                        	*/
                        	vm.showAuthModal = false;
                        	vm.bookingModal = true;
                        }
                        else {
                        	/*
                        	just close the booking modal
                        	*/
                        	vm.showAuthModal = false;
                        }


                    }

                    // close auth modal and open booking modal box
                    

                

                console.log(response);
            }

            function loginError(response)
            {   
                vm.loginStatus = false;
                vm.wrongCreds = true;
                console.log(response);
            }


        };


         vm.nu = {};


        vm.doRegister = function()
        {
            var error = 0;

            if(Object.keys(vm.nu).length != 5)
            {

                console.log('Cannot proceed with incomplete information');
                error ++;

            }

            else if(vm.nu.password && vm.nu.password !=  vm.nu.cpassword)
            {
                console.log('password not macthed');
                error ++;
            }
            else if (vm.nu.civilno.length != 12)
            {
                error ++;
                console.log('civil id lenght is not 12');
                
            }

            else if (!vm.validateEmail(vm.nu.email))
            {
                error ++;
                console.log('Please provide valid email address');
            }


            else if (error == 0 && Object.keys(vm.nu).length == 5 )
            {
                /*
                
                data url 
                data to push 

                */

                var registerUrl = API_URL+'/api/consumer/register';


                $http({
                method: 'POST',
                url:  registerUrl,
                data: vm.nu
                }).then(function(response){
                    
                    console.log('registration done');

                    console.log(response.data.message);
                    vm.modalType = 'login';




                }, function(response) {

                       console.log(response.data.message);

                       console.log('registration failed');

                });

            }



        };


    });

})();
