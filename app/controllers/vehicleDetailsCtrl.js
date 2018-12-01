(function() {

    angular.module('haladrive').controller('vehicleDetailsCtrl', function(API_URL, $stateParams, $http, $scope, $window){

        document.getElementsByTagName("body")[0].removeAttribute("scroll");

        var vm = this;

        vm.carid = $stateParams.id


        var targetUrl = API_URL+'/api/vehicles/'+vm.carid;

        

        vm.message = "PLease echo this in the page";

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

         })








    });

})();



