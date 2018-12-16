(function() {

    angular.module('haladrive').controller('vehicleDetailsCtrl', function(API_URL, $stateParams, $http, $scope, $state, auth, $window){

        document.getElementsByTagName("body")[0].removeAttribute("scroll");


        var vm = this;

        vm.loginStatus = null;
        vm.wrongCreds = null;

        vm.redirectionToBooking = false;

        vm.creds = {};

        vm.bookingModal = false;
        vm.showAuthModal = false;
        vm.modalType = 'login';



        vm.carid = $stateParams.id;


        vm.validateEmail = function(email)
        {

        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
        
        };


        vm.lauchModal = function()
        {
            if(!auth.isLoggedIn())
            {
                vm.showAuthModal = true;
                vm.redirectionToBooking = true;

            }
            else {
                vm.bookingModal = true;
            }
                        
        }

        vm.closeModal = function()
        {
           vm.bookingModal = false;
        }


        vm.attemptLogin = function()
        {
            
            console.log('attempt to login start');

            console.log(vm.creds);

            var promise  = auth.login(vm.creds);
            promise.then(loginSuccess, loginError);


            function loginSuccess(response)
            {
                vm.loginStatus = true;
                vm.wrongCreds = false;


                if(vm.redirectionToBooking)
                {
                    

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

                        vm.showAuthModal = false;
                        vm.bookingModal = true;

                    }
                    // close auth modal and open booking modal box
                    

                }

                console.log(response);
            }

            function loginError(response)
            {   
                vm.loginStatus = false;
                vm.wrongCreds = true;
                console.log(response);
            }


        };

        vm.bd = {
                'vehicle_id': vm.carid
        };

        vm.bookingRequest = function()
        {

            

            var bookingUrl = API_URL+'/api/booking';

              $http({
                method: 'POST',
                url:  bookingUrl,
                data: vm.bd
            }).then(function(response){

                //console.log(response.data.message)

                if(response.status == 200)
                {
                    $state.go('app.bookings');
                }

            }, function(response) {


                console.log(response.data.message);

            });
            

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


        var targetUrl = API_URL+'/api/vehicles/'+vm.carid;
      

        angular.element($window).unbind('scroll');
        angular.element($window).unbind('resize');

            var tabHeader =  angular.element('.CarProfileDetails__tab');
            var tabSection =  angular.element('.CarProfileDetails__section');
            tabHeader.bind('click' , function(e) {
            tabHeader.removeClass('CarProfileDetails__tab--active');
            $(this).addClass('CarProfileDetails__tab--active');
            var indexTab = $('.CarProfileDetails__tab').index(this);
            tabSection.removeClass('CarProfileDetails__section--active');
            tabSection.eq(indexTab).addClass('CarProfileDetails__section--active');
            e.preventDefault();
           });




         $http.get(targetUrl).then(
            // success callback
            function(response){

                vm.car = response.data.v[0];
                vm.optionsEN = [];
                vm.optionsAR = [];

                for(var key in vm.car.options)
                {
                    
                    itemEN = vm.car.options[key].titleEN;
                    itemAR = vm.car.options[key].titleAR;
                    vm.optionsEN.push(itemEN);
                    vm.optionsAR.push(itemAR);                       
                    
                }

                vm.optionCollection = {
                    "en" : vm.optionsEN,
                    "ar" : vm.optionsAR
                }

                    
                }, 
            // error callback
            function(response){

                console.log('cannot fetch the vehicle');

         });


         vm.generateTimeArray = function(step) {

            var dtr = [];
                var dt = new Date(1970, 0, 1, 0, 0, 0, 0);
                while (dt.getDate() == 1) {
                // var point = dt.toLocaleTimeString('en-US');

                var point = dt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});


                dt.setMinutes(dt.getMinutes() + step);
                dtr.push(point);
            }

            return dtr;
        }


        vm.timerangeArr = vm.generateTimeArray(30);
        

    });




})();



