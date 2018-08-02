(function() {

    angular.module('haladrive').controller('exampleCtrl', function(API_URL, $http, $scope){


        var vm = this;
        vm.cars = false;
        vm.queryString = '?all';

        var targetUrl = API_URL+'/api/vehicles/q/'+vm.queryString;



        vm.appliedFilter = [];


        vm.applyfilter = function()
        {

        }



        $http.get(targetUrl).then(

	        function(response) {		

				vm.cars = response.data;
                
	        }, function(response) {

        	   console.log('error has occured');

        	});

	        console.log('exammple controller is loaded');

    });

})();
