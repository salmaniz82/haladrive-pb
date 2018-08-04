(function() {

    angular.module('haladrive').controller('exampleCtrl', function(API_URL, $http, $scope, $timeout){


        var vm = this;
        vm.cars = false;

        vm.queryString = '?all';

        $scope.mileRange = 10;
        $scope.priceRange = 10;

        $scope.changeHistory = 1;



        vm.targetUrl = API_URL+'/api/vehicles/b/'+vm.queryString;
        


        $scope.filterHeaderItem = [];
        $scope.appliedFilterItem = [];


        $scope.filterHeader = function(filterHeaderSelc)
        {

            var idx = $scope.filterHeaderItem.indexOf(filterHeaderSelc);

            if(idx == -1)
            {
                $scope.filterHeaderItem.push(filterHeaderSelc);
            }

            else {
                $scope.filterHeaderItem.splice(idx, 1);
            }

        };


        

        $scope.filterHeaderClass = function(fh)
        {
           
           if($scope.filterHeaderItem.indexOf(fh) == -1)
           {
                return '';
           }
           else {
                return 'CarBrowser__filters-list-open';
           }
           
        }

        $scope.isOpenList = function(fh)
        {

            if($scope.filterHeaderItem.indexOf(fh) == -1)
           {
                return '';
           }
           else {
                return 'CarBrowser__filters-section-header-open open';
           }

        }


        $scope.filterListSelc = function(itemObj)
        {

            var arrIndex;
            var result = null;
            var keyPointer = null;
            var headerSlug = itemObj.g_slug;
            headerSlug.toString();
            var filterEntry = itemObj.titleEN;
            var headerPosKey;
            var headerMatched;
            var stats;
            /*
                appliedFilterItem
            */
           for(var key in $scope.appliedFilterItem)
           {
                if( $scope.appliedFilterItem[key].hasOwnProperty(headerSlug) )
                {
                    headerMatched = true;
                    headerPosKey = key;
                    break;
                }
                else {  

                    headerPosKey = key;

                    if($scope.appliedFilterItem[headerPosKey][headerSlug] == undefined)
                    {
                        
                        headerMatched = false;
                    }
                
                }
           }

                if(!headerMatched)
                {
   
                    var temp = {};
                    temp[headerSlug] = [filterEntry];
                    $scope.appliedFilterItem.push(temp);


                    
                }

                else {
                    if($scope.appliedFilterItem[headerPosKey][headerSlug].indexOf(filterEntry) != -1)
                    {
                        var idx = $scope.appliedFilterItem[headerPosKey][headerSlug].indexOf(filterEntry);
                        $scope.appliedFilterItem[headerPosKey][headerSlug].splice(idx, 1);

                        if($scope.appliedFilterItem[headerPosKey][headerSlug].length == 0)
                        {
                              $scope.appliedFilterItem.splice(headerPosKey, 1);
                        }
                    }
                    else {
                        $scope.appliedFilterItem[headerPosKey][headerSlug].push(filterEntry);
                    }
                }

                $scope.changeHistory++;

                vm.prepareQueryString($scope.appliedFilterItem);

        }

        $scope.isFilterItemActive = function(itemObj)
        {

            var arrIndex;
            var result = null;
            var keyPointer = null;
            var headerSlug = itemObj.g_slug;
            var filterEntry = itemObj.titleEN;
            var headerPosKey;
            var headerMatched;

            for(var key in $scope.appliedFilterItem)
           {
                if($scope.appliedFilterItem[key].hasOwnProperty(headerSlug))
                {
                    headerMatched = true;
                    headerPosKey = key;

                    
                }
                else {                   
                    headerMatched = false;
                }

                if( (headerMatched) && ($scope.appliedFilterItem[headerPosKey][headerSlug].indexOf(filterEntry) != -1))
                {
                    return 'CarBrowser__filters-list-item-selected';
                }

           }

        }


        vm.prepareQueryString = function(filterObj)
            {
                
                var string = '';

                for(var key in filterObj)
                {
                    for(var propName in filterObj[key])
                    {   

                        var ItemLenghts = filterObj[key][propName].length;

                        for(i=0; i <=ItemLenghts-1; i++)
                        {
                        
                            string += '&'+propName+'[]='+ filterObj[key][propName][i];
                        }
                    }
                }

                vm.queryString = '?'+string;

                return string;

            };



        $http.get(vm.targetUrl).then(

	        function(response) {		

				vm.cars = response.data;
                
	        }, function(response) {

        	   

        	});


        $scope.updatePrice = function(val)
        {

            $scope.priceRange = val;
            $scope.changeHistory++;
        };

        $scope.updateMile = function(val)
        {

            $scope.mileRange = val;
            $scope.changeHistory++;

        };


        $scope.applyFilterResult = function()
        {
            

            var filterUrl = API_URL+'/api/vehicles/b/'+vm.queryString + '&minprice='+$scope.priceRange+'&minmileage='+$scope.mileRange;

            $http.get(filterUrl).then(

            function(response) {        

                vm.cars = response.data;
                
            }, function(response) {


                

                vm.cars = response.data; 


               

            });
        };


        $scope.$watch('changeHistory', function (newValue, oldValue, scope) {

                
            if(newValue != oldValue)
            {

               $timeout($scope.applyFilterResult, 10);
               
            }
            
        }, true);

    });
})();
