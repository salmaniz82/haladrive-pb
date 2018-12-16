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
            templateUrl: 'views/cars.html',
            controller: 'carsCtrl as vm'
        })

        .state('details', {
            url: '/car-details/:id',
            templateUrl: 'views/vehicle-details.html',
            controller: 'vehicleDetailsCtrl as vm'           
        })

        .state('app', {
            controller: 'authAppCtrl',
            templateUrl: 'views/main.html',
            abstract: true
        })

        .state('app.profile', {

            url: '/profile',
            templateUrl: 'views/profile.html'

        })

        .state('app.bookings', {     
            url: '/bookings',
            templateUrl: 'views/bookings.html',
            controller: 'bookingCtrl as vm'
        })

        .state('app.logout', {
            url: '/logout',
            templateUrl: 'views/logout.html',
            controller: 'logoutCtrl as vm'
            
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

        .state('app.dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard.html',
            controller: 'dashboardCtrl as vm'
        })



        .state('app.settings', {
            url: '/settings',
            templateUrl: 'views/settings.html'
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