(function(){

    angular.module('haladrive')


    .config(stateConfig);

    function stateConfig($stateProvider, $urlRouterProvider, $locationProvider){

         $locationProvider.html5Mode({
            enabled: true,
            requireBase: true  
         });

        $urlRouterProvider.otherwise('notfound');
        $stateProvider
        .state('home', {

        url: '/',
        templateUrl: 'views/home.html',
        controller : 'homeCtrl'

        })

        .state('profile', {

            url: '/profile',
            templateUrl: 'views/profile.html'

        })


        .state('cars', {
            url: '/cars',
            templateUrl: 'views/cars.html',
            controller: 'carsCtrl as vm'
        })


        .state('details', {

            url: '/car-details/:id',
            templateUrl: 'views/vehicle-details.html',
            controller: 'vehicleDetailsCtrl as vm'
            
        })

        .state('modal', {

            url: '/modal',
            templateUrl: 'views/modalbase.html',
            controller: 'modalCtrl as vm'
            
        })


        .state('ua', {
            templateUrl: 'views/templates/ua.html',
            abstract: true
        })

        .state('ua.login', {

            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'loginCtrl as vm'

        })

        .state('ua.register', {

            url: '/register',
            templateUrl: 'views/register.html'

        })


        .state('app', {
            templateUrl: 'views/templates/main.html',
            controller: 'authAppCtrl',
            abstract: true

        })

        .state('app.logout', {
            templateUrl: 'views/logout.html',
            controller: 'logoutCtrl as vm'
            
        })

        .state('app.dashboard', {

            url: '/dashboard',
            templateUrl: 'views/dashboard.html',
            controller: 'dashboardCtrl as vm'

        })



        .state('app.settings', {
            url: '/settings',
            templateUrl: 'views/settings.html'
        })

        
        .state('app.vehicles', {
            
            url: '/vehicles',
            templateUrl: 'views/vehicles.html',
            controller: 'vehicleCtrl as vm'
        })

        

        .state('app.vehiclesadd', {
            
            url: '/vehicles/add',
            templateUrl: 'views/vehicle-add.html',
            controller: 'vehicleAddCtrl as vm'
        })

        .state('app.vslide', {
            
            url: '/vehicle/vslides/:id',
            templateUrl: 'views/vehicle-add-slides.html',
            controller: 'vehicleAddSlidesCtrl as vm'
        })


        .state('app.vehicleEdit', {
            
            url: '/vehicle/edit/:id',
            templateUrl: 'views/vehicle-edit.html',
            controller: 'vehicleEditCtrl as vm'
        })



        .state('app.clients', {
            
            url: '/clients',
            templateUrl: 'views/clients.html',
            controller: 'clientsCtrl as vm'
        })

        .state('app.cliadd', {

            url: '/cliadd',
            templateUrl: 'views/clients-add.html',
            controller: 'clientsAddCtrl as vm'

        })

        .state('app.cliedit', {

            url: '/cliedit/:id',
            templateUrl: 'views/clients-edit.html',
            controller: 'clientEditCtrl as vm'
        })

        .state('app.bookings', {
            
            url: '/bookings',
            templateUrl: 'views/bookings.html',
            controller: 'bookingCtrl as vm'
        })


            .state('app.test', {

                url : '/otest',
                templateUrl: 'views/otest.html',
                controller: 'otestCtrl as vm',
                authorize : true,
                resolve : {
                    security: ['$q','auth', function($q, auth){
                    if(auth.getUser().role_id != 1){
                    return $q.reject("Not Authorized");
                    }
                    }]
                }


            })

        .state('notfound', {
            url: '/notfound',
            templateUrl: 'views/404.html'
        });



    }

 })();