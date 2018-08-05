(function(){
	angular.module('haladrive')
	.controller('appCtrl', function($scope, auth, langSer, API_URL, $http, $rootScope){
		var vm = this;

		$scope.baseUrl = API_URL;

		//$scope.lang = 'en';

        $scope.lang = langSer.init();

        

        $scope.apiGlobals = false;

		$scope.gval = {

                "vehicles": ['Vehicles', 'المركبات'],
                "clients": ['Clients', 'عملاء'],
                'bookings' : ['Bookings', 'الحجوزات'],
                'invoices': ['Invoices', 'الفواتير'],
                'features' : ['Features', 'الميزات'],
                'finance': ['Finance', 'المالية'],
                'insurance': ['Insurance', 'تأمين'],
                'global': ['Global', 'عالمي'],
                'gsection': ['Global Section', 'القسم العالمي'],
                'brand': ['Brand', 'علامة تجارية'],

                'maintenance': ['Maintenance', 'اعمال صيانة'],

                'details': ['Details', 'تفاصيل'],



                'status': ['Status', 'الحالة'],
                'available' : ['Available', 'متوفر'],

                'options': ['Actions', 'خيارات'],
                'details': ['Details', 'تفاصيل'],
                'edit': ['Edit', 'تصحيح'],
                'remove': ['Remove', 'حذف'],

                'addnew': ['Add New', 'اضف جديد'],
                'update': ['Update', 'تحديث'],
                'save': ['Save', 'حفظ'],
                'cancel': ['Cancel', 'حذف'],


                'back': ['Back', 'الى الخلف'],

                'profile': ['Profile', 'الملف الشخصي'],
                'setting': ['Setting', 'ضبط'],
                'logout': ['Logout', 'الخروج']

        };



		vm.isLoggedIn = function()
		{
			return auth.isLoggedIn();	
		};

		$scope.getAuthUsername = function()
		{
                return vm.authUser().name;
		};

        $scope.isAdmin = function()
        {
            if(vm.authUser().role_id == 1)
            {
                return true;
            }
            else {
                return false;
            }
        };


		vm.authUser = function()
		{

            if(this.hastokenAndUser())
            {
                var user = localStorage.getItem('hdauEn');
                user = atob(user);
                return  user = JSON.parse(user);
            }

		};

        vm.hastokenAndUser = function()
        {
            if(localStorage.hasOwnProperty('auth_token') && localStorage.hasOwnProperty('hdauEn'))
            {
                return true;
            }
            else {
                return false;
            }
        };



		$scope.langLabel = function()
		{
			if($scope.lang == 'en')
			{
				return 'Arabic';
			}
			else {
				return 'English';
			}
		};


		vm.branding = "Haladrive";


		$scope.switchLang = function()
        {

            $scope.lang = langSer.switchLang();

        };

        $scope.authUser = vm.authUser();

        $scope.langIndex = function()
        {
            if($scope.lang == 'en')
            {
                return 0;
            }
            else {
                return 1;
            }
        };


        vm.getApiGlobal = function(){


            var targetUrl = API_URL+'/api/filters';

            $http.get(targetUrl).then(

                function(response) {

                    var masterData = response.data;                    
                    $scope.modelList  = masterData.models;
                    delete masterData.models;
                    $scope.apiGlobals = masterData;
                }, 

                function(response){
                    console.log('error loading global values from ' + targetUrl);

                });



        };

        vm.getApiGlobal();






    });


})();