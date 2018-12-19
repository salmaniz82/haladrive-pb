(function() {

    angular.module('haladrive').controller('pubDetailsCtrl', function(API_URL, $stateParams, $http, $scope, $state, auth, $window){

        // document.getElementsByTagName("body")[0].removeAttribute("scroll");


        $scope.$parent.pub.footer = true;
        $scope.$parent.pub.pageId = 'details';


        var vm = this;

        vm.loginStatus = null;
        vm.wrongCreds = null;

        vm.redirectionToBooking = false;

        

        vm.bookingModal = false;

        vm.carid = $stateParams.id;



        /* launch booking modal */
        vm.lauchModal = function()
        {
            if(!auth.isLoggedIn())
            {
                $scope.$parent.pub.redirectionToBooking = true;
                $scope.$parent.pub.showAuthModal = true;

            }
            else {
                $scope.$parent.pub.bookingModal = true;
            }
                        
        }

        vm.closeModal = function()
        {
           $scope.$parent.pub.bookingModal = false;
        }


       

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

       


        var targetUrl = API_URL+'/api/vehicles/'+vm.carid;


      
        /*
        angular.element($window).unbind('scroll');
        angular.element($window).unbind('resize');
        */

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



