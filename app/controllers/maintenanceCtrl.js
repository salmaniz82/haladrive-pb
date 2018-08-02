(function() {

    angular.module('haladrive').controller('maintenanceCtrl', function(API_URL, $http, $state, $stateParams, $scope){

        var vm = this;

        $scope.globalLoaded = false;

        vm.id = $stateParams.id;
        vm.nvins = {};
        vm.editmode = null;
        vm.addSubmitted = false;

        vm.fetchList = function()
        {
            var url = API_URL+'/api/maintain/'+vm.id;
            $http.get(url).then(
                // success
                function(response){
                //vm.dataList = response.data;
                vm.dataList = response.data;

                vm.editmode = "showall";


            }, function (response){
                // success
                    console.log('error on main listing');
                    vm.dataList = response.data;

                });
        };




        vm.fetchList();

        vm.addNew = function()
        {
                var url = API_URL+'/api/maintain';
                vm.addSubmitted = true;
                var data = {

                    vehicle_id: vm.id,
                    description: vm.nd.description,
                    cost: vm.nd.cost,
                    miles: vm.nd.miles
                };

                $http({
                    url: url,
                    method: 'POST',
                    data: data
                }).then(function(response){

                    if(response.data.status == true)
                    {
                        vm.nvins = {};
                        vm.fetchList();
                        vm.cancelMode();
                        var notify = {
                            type: 'success',
                            title: 'Success',
                            content: response.data.message,
                            timeout: 5000 //time in ms
                        };
                        $scope.$emit('notify', notify);
                    }
                }, function(response) {

                    var notify = {
                        type: 'error',
                        title: 'Error',
                        content: response.data.message,
                        timeout: 5000 //time in ms
                    };
                    $scope.$emit('notify', notify);

                });



        };

        vm.updateStatus = function(status, id)
        {
            var url = API_URL+'/api/insurance/'+id;
            var cleanStatus = status.replace(/['"]+/g, "");
            var data = {status: cleanStatus};
            $http({
                method: 'PUT',
                url: url,
                data: data
            }).then(function(response) {
                if(response.data.status == true)
                {
                   console.log('status updated with Success');
                }
                else {
                   console.log('failed while updating the status');
                }
            });
        };

        vm.remove = function(i, id) {

            var url = API_URL+"/api/maintain/"+id;
            $http.delete(url)
                .then(
                    function(response) {
                    if(response.data.status == true)
                    {
                        vm.dataList.m.splice(i, 1);
                    }
                },
                function(response)
                {

                }
                );

        };

        vm.cancelMode = function()
        {
            vm.editmode = "showall";
            vm.nd = {};
            vm.ndr = {};
        };


        vm.edit = function(index)
        {
            vm.editmode = 'showedit';
            /*
            vm.vinsr = vm.dataList.vi[index];
            */

            vm.vinsr = Object.assign({}, vm.dataList.vi[index]);

        };

        vm.update = function()
        {

            var id = vm.vinsr.id;
            var url = API_URL+'/api/vinsurance/'+id;

            var postData = {
                ins_id: vm.vinsr.ins_id,
                insuredName: vm.vinsr.insuredName,
                nationality: vm.vinsr.nationality,
                registration: vm.vinsr.registration,
                expiration: vm.vinsr.expiration,
                policyno: vm.vinsr.policyno,
                licensepurpose: vm.vinsr.licensepurpose
            };

            $http({
                url : url,
                method: 'PUT',
                data : postData
            }).then(function(response){

                if(response.data.status == true)
                {
                    vm.vinsr = {};
                    vm.fetchList();
                    vm.cancelMode();
                }

            });

        };

        console.log('maitenance activated');

    });

})();
