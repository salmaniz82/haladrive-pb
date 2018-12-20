(function() {

    angular.module('haladrive').controller('notifyCtrl', function(API_URL, $scope){


        var vm = this;


        vm.notifySuccess = function()
        {
        	 var notify = {
                        type: 'success',
                        title: 'Success',
                        content: 'Testing Notification',
                        timeout: 3000 //time in ms
                    };
                    $scope.$emit('notify', notify);
        };



        vm.notifyError = function()
        {
        	 var notify = {
                        type: 'error',
                        title: 'Error Heading',
                        content: 'This is the error message',
                        timeout: 3000 //time in ms
                    };
                    $scope.$emit('notify', notify);
        };



        vm.notifyWarning = function()
        {
        	 var notify = {
                        type: 'warning',
                        title: 'Warning Heading',
                        content: 'Warning message ',
                        timeout: 3000 //time in ms
                    };
                    $scope.$emit('notify', notify);
        };



        vm.notifyInfo = function()
        {
        	 var notify = {
                        type: 'info',
                        title: 'Information heading',
                        content: 'Information heading is there',
                        timeout: 3000 //time in ms
                    };
                    $scope.$emit('notify', notify);
        };


    });

})();
