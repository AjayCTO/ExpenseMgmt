
var app = angular.module('AngularAuthApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar']);

app.config(function ($routeProvider) {

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "/app/views/home.html"
    });

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "/app/views/login.html"
    });

    $routeProvider.when("/signup", {
        controller: "signupController",
        templateUrl: "/app/views/signup.html"
    });

    $routeProvider.when("/orders", {
        controller: "ordersController",
        templateUrl: "/app/views/orders.html"
    });

    $routeProvider.when("/refresh", {
        controller: "refreshController",
        templateUrl: "/app/views/refresh.html"
    });

    $routeProvider.when("/tokens", {
        controller: "tokensManagerController",
        templateUrl: "/app/views/tokens.html"
    });

    $routeProvider.when("/associate", {
        controller: "associateController",
        templateUrl: "/app/views/associate.html"
    });    

    $routeProvider.when("/project", {
        controller: "projectController",
        templateUrl: "/app/views/project.html"
    });

    $routeProvider.when("/assets", {
        controller: "AssetsController",
        templateUrl: "/app/views/Asset.html"
    });

    $routeProvider.when("/category", {
        controller: "CategoryController",
        templateUrl: "/app/views/Category.html"
    });

    $routeProvider.when("/expense", {
        controller: "ExpenseController",
        templateUrl: "/app/views/expense.html"
    });

    $routeProvider.when("/incoming", {
        controller: "incomingController",
        templateUrl: "/app/views/incoming.html"
    });

    $routeProvider.when("/supplier", {
        controller: "SupplierController",
        templateUrl: "/app/views/Supplier.html"
    });

    $routeProvider.when("/manufacturer", {
        controller: "ManufacturerController",
        templateUrl: "/app/views/Manufacturer.html"
    });

    $routeProvider.when("/reports", {
        controller: "ReportsController",
        templateUrl: "/app/views/Reports.html"
    });

    $routeProvider.otherwise({ redirectTo: "/login" });

});

//var serviceBase = 'http://localhost:26264/';

//var serviceBase = 'http://hms.shivamitconsultancy.com/';
var serviceBase = 'http://crm.shivamitconsultancy.com/';


//var serviceBase = 'http://ngauthenticationapi.azurewebsites.net/';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngAuthApp'
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);


// factory for all messages 
app.factory('log', function () {
    toastr.options = {
        closeButton: true,
        positionClass: 'toast-top-right',
    };
    return {
        success: function (text) {
            toastr.success(text, "Success");
        },
        error: function (text) {
            toastr.error(text, "Error");
        },
        info: function (text) {
            toastr.info(text, "Info");
        },
        warning: function (text) {
            toastr.warning(text, "Warning");
        },
    };
});


app.factory('SweetAlert', [ '$rootScope', function ( $rootScope ) {

    var swal = window.swal;
   
    //public methods
    var self = {

        swal: function ( arg1, arg2, arg3 ) {
            $rootScope.$evalAsync(function(){
                if( typeof(arg2) === 'function' ) {
                    swal( arg1, function(isConfirm){
                        $rootScope.$evalAsync( function(){
                            arg2(isConfirm);
                        });
                    }, arg3 );
                } else {
                    swal( arg1, arg2, arg3 );
                }
            });
        },
        success: function(title, message) {
            $rootScope.$evalAsync(function(){
                swal( title, message, 'success' );
            });
        },
        error: function(title, message) {
            $rootScope.$evalAsync(function(){
                swal( title, message, 'error' );
            });
        },
        warning: function(title, message) {
            $rootScope.$evalAsync(function(){
                swal( title, message, 'warning' );
            });
        },
        info: function(title, message) {	
            $rootScope.$evalAsync(function(){
                swal( title, message, 'info' );
            });
        }
    };
	
    return self;
}]);


