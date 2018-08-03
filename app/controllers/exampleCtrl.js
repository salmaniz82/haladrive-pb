(function() {

    angular.module('haladrive').controller('exampleCtrl', function(API_URL, $http, $scope){


        var vm = this;
        vm.cars = false;
        vm.queryString = '?all';

        vm.targetUrl = API_URL+'/api/vehicles/q/'+vm.queryString;


        vm.mileRange = 500;
        vm.priceRange = 800;



        $scope.appliedFilter = [ 

            {'all': true}

            
        ];

        $scope.appliedFilterItem = [];


        $scope.filterHeader = function(filterHeaderSelc)
        {
            

            var result = null;
            var keyPointer = null;
           for(var key in $scope.appliedFilter)
           {
                if($scope.appliedFilter[key].hasOwnProperty(filterHeaderSelc))
                {
                    result = true;

                    keyPointer = key;
                }
                else {                   
                    result = false;
                }


           }

                if(!result)
                {
                    var temp = {};
                    temp[filterHeaderSelc] = null;
                    $scope.appliedFilter.push(temp);
                }

                else {
                    $scope.appliedFilter.splice(keyPointer, 1);
                }

            

        };


        

        $scope.filterHeaderClass = function(fh)
        {
           
           // 
           var result = null;
           for(var key in $scope.appliedFilter)
           {
                if($scope.appliedFilter[key].hasOwnProperty(fh))
                {
                    result = true;
                    keyPointer = key;
                }
                else {                   
                    result = false;
                }
           }
                if(!result)
                {
                      return '';
                }
                else {
                    return 'CarBrowser__filters-list-open';                   
                }

        }

        $scope.isOpenList = function(fh)
        {
            // 

            var result = null;
           for(var key in $scope.appliedFilter)
           {
                if($scope.appliedFilter[key].hasOwnProperty(fh))
                {
                    result = true;
                    keyPointer = key;
                }
                else {                   
                    result = false;
                }
           }
                if(!result)
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
                        console.log($scope.appliedFilterItem[headerPosKey][headerSlug]);
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
                    }
                    else {
                        $scope.appliedFilterItem[headerPosKey][headerSlug].push(filterEntry);
                    }
                }

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



        $http.get(vm.targetUrl).then(

	        function(response) {		

				vm.cars = response.data;
                
	        }, function(response) {

        	   

        	});

	        

    });

})();
