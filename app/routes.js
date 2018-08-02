(function(){

    angular.module('haladrive')


    .config(stateConfig);

    function stateConfig($stateProvider, $urlRouterProvider, $locationProvider){

        $urlRouterProvider.otherwise('notfound');
        $stateProvider
        .state('home', {

        url: '',
        templateUrl: 'views/home.html',
        controller : 'homeCtrl'

        })

        .state('profile', {

            url: '/profile',
            templateUrl: 'views/profile.html'

        })

        .state('test', {

            url: '/test',
            templateUrl: 'views/test.html'
        })

        .state('example', {
            url: '/example',
            templateUrl: 'views/example.html',
            controller: 'exampleCtrl as vm'
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

        .state('app.vdetails', {

            url: '/vehicles/detail/:id',
            templateUrl: 'views/vehicle-details.html',
            controller: 'vehicleDetailCtrl as vm'
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

        .state('app.invoices', {
            
            url: '/invoices',
            templateUrl: 'views/invoices.html',
            controller: 'invoiceCtrl as vm'
        })

        .state('app.features', {
            
            url: '/features',
            templateUrl: 'views/features.html',
            controller: 'featuresCtrl as vm'
        })

        .state('app.finance', {
            
            url: '/finance',
            templateUrl: 'views/finance.html',
            controller: 'financeCtrl as vm'
        })

        .state('app.finadd', {

            url: '/financeadd',
            templateUrl: 'views/finance-add.html',
            controller: 'financeAddCtrl as vm'
        })

        .state('app.finedit', {

            url: '/finedit/:id',
            templateUrl: 'views/finance-edit.html',
            controller: 'financeEditCtrl as vm'
        })


        .state('app.insurance', {

            url: '/insurance',
            templateUrl: 'views/insurance.html',
            controller: 'insuranceCtrl as vm'
        })

        .state('app.vinsurance', {
            url: '/vinsurance/:id',
            templateUrl: 'views/v-insurance.html',
            controller: 'vinsuranceCtrl as vm'
        })

        .state('app.vfinance', {
            url: '/vfinance/:id',
            templateUrl: 'views/v-finance.html',
            controller: 'vfinanceCtrl as vm'
        })

        .state('app.maintenance', {
            url: '/maintenance/:id',
            templateUrl: 'views/maintenance.html',
            controller: 'maintenanceCtrl as vm'
        })


        .state('app.insadd', {
            url: '/insadd',
            templateUrl: 'views/insurance-add.html',
            controller: 'insuranceCtrl as vm'
        })

        .state('app.global', {
            url : '/global',
            templateUrl: 'views/global.html',
            controller: 'globalCtrl as vm',
            authorize : true,
            resolve : {
            security: ['$q','auth', function($q, auth){
            if(auth.getUser().role_id != 1){
                return $q.reject("Not Authorized");
                }
                }]
            }

            })

            .state('app.gsection', {
                url : '/global/:section',
                templateUrl: 'views/global-section.html',
                controller: 'gSectionCtrl as vm',
                authorize : true,
                resolve : {
                    security: ['$q','auth', function($q, auth){
                    if(auth.getUser().role_id != 1){
                    return $q.reject("Not Authorized");
                    }
                    }]
                }
            })

            .state('app.brand', {
                url : '/brand/:id',
                templateUrl: 'views/global-brand.html',
                controller: 'gBrandCtrl as vm',
                authorize : true,
                resolve : {
                    security: ['$q','auth', function($q, auth){
                    if(auth.getUser().role_id != 1){
                    return $q.reject("Not Authorized");
                    }
                    }]
                }
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