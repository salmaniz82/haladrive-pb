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

        vm.addNew = function()
        {

            var url = API_URL+'/api/gbrands';
            var id = $stateParams.id;
            var ndata = {'brand_id': id, 'nameEN': vm.ndata.titleEN, 'nameAR': vm.ndata.titleAR};

            $http({
                method: 'POST',
                url:  url,
                data: ndata
            }).then(function(response){

                if(response.data.status == 1)
                {
                    vm.fetch();
                    vm.ndata = {};
                    vm.mode = 'list';
                }

            });

        };



        vm.remove = function (i, id)
        {
            var url = API_URL+"/api/booking/"+id;

            $http.delete(url)
                .then(function(response) {

                    // success

                    console.log(response.data.status);

                    if(response.data.status == true)
                    {
                        vm.dataList.b.splice(i, 1);
                    }



                }, function(response){
                    /* error */

                    var notify = {
                        type: 'error',
                        title: 'Error',
                        content: response.data.message,
                        timeout: 5000 //time in ms
                    };
                    $scope.$emit('notify', notify);

                });

        };



        vm.update = function()
        {

            var id = vm.rdata.id;
            var url = API_URL+'/api/gbrands/'+id;

            $http({
                url : url,
                method: 'PUT',
                data : vm.rdata
            }).then(function(response){

                if(response.data.status == true)
                {
                    vm.rdata = {};
                    vm.mode = 'list';
                }
            });

        };

        vm.updateBookingStatus = function(id, statusLabel)
        {
            var url = API_URL+'/api/booking/'+id;

            var updateIndex  = vm.getIndex('id', id);

            console.log(updateIndex);

            var data = {status: statusLabel};

            $http({
                method: 'PUT',
                url: url,
                data: data
            }).then(
                function(response)
                {
                    // success callback

                    vm.dataList.b[updateIndex].status = statusLabel;

                    var notify = {
                        type: 'success',
                        title: 'Success',
                        content: response.data.message,
                        timeout: 5000 //time in ms
                    };
                    $scope.$emit('notify', notify);
                },
                function(response)
                {
                    // error callback

                    console.log('cannot update status');
                    var notify = {
                        type: 'error',
                        title: 'Error',
                        content: response.data.message,
                        timeout: 5000 //time in ms
                    };
                    $scope.$emit('notify', notify);
                });
        };



        vm.endBooking = function(id, statusLabel)
        {
            var url = API_URL+'/api/booking/'+id;

            var updateIndex  = vm.getIndex('id', id);

            var data = {status: statusLabel, endMileage: vm.rdata.endMileage};

            if(vm.rdata.endMileage !== undefined && vm.rdata.endMileage !== "" && vm.rdata.endMileage.length !== 0)
            {
                $http({
                    method: 'PUT',
                    url: url,
                    data: data
                }).then(
                    function(response)
                    {
                        // success callback
                        $('.modal').modal();
                        vm.rdata.endMileage = "";
                        vm.dataList.b[updateIndex].status = statusLabel;
                        var notify = {
                            type: 'success',
                            title: 'Success',
                            content: response.data.message,
                            timeout: 5000 //time in ms
                        };
                        $scope.$emit('notify', notify);
                    },
                    function(response)
                    {
                        // error callback
                        console.log('cannot update status');
                        var notify = {
                            type: 'error',
                            title: 'Error',
                            content: response.data.message,
                            timeout: 5000 //time in ms
                        };
                        $scope.$emit('notify', notify);
                    });
            }

            else {
                var notify = {
                    type: 'error',
                    title: 'Error',
                    content: 'Please enter end mileage',
                    timeout: 5000 //time in ms
                };
                $scope.$emit('notify', notify);
            }

        };


    });

})();
