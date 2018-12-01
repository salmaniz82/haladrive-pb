(function() {

    angular.module('haladrive').controller('carsCtrl', function(API_URL, $http, $scope, $timeout, $rootScope, $window){


        var vm = this;
        vm.cars = false;

        

        vm.queryString = '?all';

        $scope.mileRange = 10;
        $scope.priceRange = 10;

        $scope.changeHistory = 1;

        vm.targetUrl = API_URL+'/api/vehicles/b/'+vm.queryString;

        $scope.filterHeaderItem = [];
        $scope.appliedFilterItem = [];

        $scope.isFetching = false;



        $scope.haveFilters = function() 
        {
           
           return ($scope.appliedFilterItem.length > 0) ? true : false;

        };

        $scope.clearFilters = function()
        {

            $scope.appliedFilterItem.splice(0, $scope.appliedFilterItem.length);
            vm.queryString = '?all';

            $scope.changeHistory++;
        };




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
            

            var itemsToRemove = (vm.cars.v.length - 10);
            

            vm.cars.v.splice(1, itemsToRemove);

            if(!$scope.isFetching)
            {

                $scope.isFetching = true;

                var filterUrl = API_URL+'/api/vehicles/b/'+vm.queryString + '&minprice='+$scope.priceRange+'&minmileage='+$scope.mileRange;

                $http.get(filterUrl).then(

                function(response) {        

                    vm.cars = response.data;

                    $scope.isFetching = false;
                    
                }, function(response) {

                    vm.cars = response.data; 

                    $scope.isFetching = false;
                });

            }

            
        };


        $scope.fetchMore = function() 
        {

            $scope.isFetching = true;

            console.log('via load more' + vm.cars.v.length);

            var paginate = '&limit='+parseInt(vm.cars.limit)+'&page='+parseInt(++vm.cars.currentPage);
             

            var filterUrl = API_URL+'/api/vehicles/b/'+vm.queryString + '&minprice='+$scope.priceRange+'&minmileage='+$scope.mileRange+paginate;

            


            $http.get(filterUrl).then(

            function(response) {        

                

                for(var i=0; i <= response.data.v.length-1; i++)
                {
                    

                    vm.cars.v.push(response.data.v[i]);
                }

                vm.cars.limit = response.data.limit;
                vm.cars.records = response.data.records;
                vm.cars.noPages = response.data.noPages;
                vm.cars.currentPage = response.data.currentPage;

                $scope.isFetching = false;

            }, function(response) {

              //  vm.cars = response.data; 


              console.log('error loading more data');

              $scope.isFetching = false;

            });



        };

        angular.element($window).bind('scroll', function() {

            /*
                $window.scrollY
                window.pageYOffset
                document.documentElement.offsetHeight
                console.log('clientHeight' + document.documentElement.clientHeight);
                console.log('offsetHeight' + document.documentElement.offsetHeight);
                console.log('scrollHeight' + document.documentElement.scrollHeight);
            */

            function isMobile()
            {
                if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                    return true;
                }

                else {
                    return false;
                }
            }
/*

            console.log('clientHeight' + document.documentElement.clientHeight);
            console.log('offsetHeight' + document.documentElement.offsetHeight);
            console.log('scrollHeight' + document.documentElement.scrollHeight);


            console.log('$window.pageYOffset' + $window.pageYOffset);

            */

            

            var YScrollLimit;

            if(!isMobile)
            {
                YScrollLimit = document.documentElement.scrollHeight - document.documentElement.clientHeight;    

              //  console.log('not mobile');
            }
            else {
                YScrollLimit = document.documentElement.scrollHeight - document.documentElement.clientHeight;    

                // console.log('device is mobile');

                YScrollLimit -= 100;


            }

            
          //  console.log('Y limit' + YScrollLimit);

            if($window.pageYOffset >= YScrollLimit)
            {
                

                
                var currentPage = parseInt(vm.cars.currentPage);

                var totalPages = parseInt(vm.cars.noPages);

                if(currentPage <= totalPages-1)
                {
                       

                     if(!$scope.isFetching)
                     {

                        
                        $scope.fetchMore();

                     }
                      
                
                }


                else {
                    console.log('records exhausted in this field');
                }


                

                /*

                console.log('cars Limit' + vm.cars.limit);
                console.log('cars Limit' + vm.cars.records);
                console.log('cars Limit' + vm.cars.noPages);
                console.log('cars Limit' + vm.cars.currentPage);

                */
            }



        });


        $scope.$watch('changeHistory', function (newValue, oldValue, scope) {

                
            if(newValue != oldValue)
            {

               $timeout($scope.applyFilterResult, 10);
               
            }
            
        }, true);

    });
})();
