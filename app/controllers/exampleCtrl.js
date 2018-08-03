(function() {

    angular.module('haladrive').controller('exampleCtrl', function(API_URL, $http, $scope){


        var vm = this;
        vm.cars = false;
        vm.queryString = '?all';

        var targetUrl = API_URL+'/api/vehicles/q/'+vm.queryString;


        vm.mileRange = 500;
        vm.priceRange = 800;



        $scope.appliedFilter = [];

        $scope.appliedFilterItem = [];


        $scope.filterHeader = function(filterHeaderSelc)
        {
            var arrIndex;
            if($scope.appliedFilter.indexOf(filterHeaderSelc) == -1)
            {
                
                $scope.appliedFilter.push(filterHeaderSelc);
                return true;
            }
            else {
                
                var arrIndex = $scope.appliedFilter.indexOf(filterHeaderSelc);
                $scope.appliedFilter.splice(arrIndex, 1); 
                return false;
            }
           
        }

        $scope.filterHeaderClass = function(fh)
        {
           if ($scope.appliedFilter.indexOf(fh) == -1) 
           {
                return '';
           }

           else {
                return 'CarBrowser__filters-list-open';
           } 
        }

        $scope.isOpenList = function(fh)
        {

           if ($scope.appliedFilter.indexOf(fh) == -1) 
           {
                return '';
           }    
           else {
                return 'CarBrowser__filters-section-header-open open';
           }

        }


        $scope.filterListSelc = function(item)
        {

            var arrIndex;
            if($scope.appliedFilterItem.indexOf(item) == -1)
            {
                
                $scope.appliedFilterItem.push(item);
                return true;
            }
            else {
                
                var arrIndex = $scope.appliedFilterItem.indexOf(item);
                $scope.appliedFilterItem.splice(arrIndex, 1); 
                return false;
            }

        }

        $scope.isFilterItemActive = function(item)
        {
            if($scope.appliedFilterItem.indexOf(item) == -1)
            {
                return '';
            }
            else {
                return 'CarBrowser__filters-list-item-selected';
            }
            
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
