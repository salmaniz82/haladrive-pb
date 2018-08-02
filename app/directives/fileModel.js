angular.module('haladrive').directive("fileInput", function($parse){
    return{
        link: function($scope, element, attrs){
            element.on("change", function(event){
                var files = event.target.files;
                //console.log(files[0].name);
                $parse(attrs.fileInput).assign($scope, element[0].files);
                $scope.$apply();
            });
        }
    }
});