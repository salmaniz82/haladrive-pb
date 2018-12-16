(function() {

    angular.module('haladrive').controller('bookingCtrl', function(API_URL, $stateParams, $http, $scope){

        var vm = this;

        vm.mode = 'list';
        vm.records = false;


        vm.findIndex = function findWithAttr(array, attr, value) {
            for(var i = 0; i < array.length; i += 1) {
                if(array[i][attr] === value) {
                    return i;
                }
            }
            return -1;
        };

        vm.getIndex = function(prop, val)
        {
            var index = vm.findIndex(vm.dataList.b, prop, val);
            return index;
        };

        vm.fetch = function()
        {

            var url = API_URL+'/api/booking';

            $http({
                url: url,
                method: 'GET'
            }).then(function(response){

                // success callback
                if(response.status == 200)
                {
                    vm.dataList = response.data;
                    vm.records = true;

                }
            // error callback
            }, function(response) {

                vm.dataList = response.data;
                vm.records = false;

            });

        };

        vm.fetch();


        console.log('booking controller is activated');


    });

})();
