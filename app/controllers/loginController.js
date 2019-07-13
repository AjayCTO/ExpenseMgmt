'use strict';
app.controller('loginController', ['$scope', '$location', 'authService', 'ordersService', 'ngAuthSettings', function ($scope, $location, authService, ordersService, ngAuthSettings) {
    $scope.Otpform = {};
    $scope.loginData = {
        userName: "",
        password: "",
        useRefreshTokens: false
    };







    $(".toggle-password").click(function () {   
        $(this).toggleClass("fal fa-eye-slash");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

    $scope.Forgotpassword = function ()
    {       
        showLoader();
        $scope.ForgotEmail
        ordersService.forgotPassword($scope.ForgotEmail).then(function (results) {        
            $("#ForgotModal").modal("hide");
            hideLoader();
            $("#OTP").modal("show");
            $scope.ListOfProjects = results.data;
        }, function (error) {

        });
    }


    $scope.Updatepassword=function()
    {
        showLoader();
      
        ordersService.ResetPassword($scope.Otpform).then(function (results) {
            $("#ForgotModal").modal("hide");
            hideLoader();
            $("#OTP").modal("show");
            $scope.ListOfProjects = results.data;
        }, function (error) {

        });
    }

    $scope.message = "";

    $scope.login = function () {
        showLoader();
        authService.login($scope.loginData).then(function (response) {
            hideLoader();
            console.log("==================Login Controller=====================")
            console.log(response)
            console.log("==================Login Controller=====================")
            $location.path('/project');

        },
         function (err) {
             hideLoader();
             $scope.message = err.error_description;
         });
    };

    $scope.openforgotmodal = function ()
    {      
        $("#ForgotModal").modal("show");
    }


    $scope.authExternalProvider = function (provider) {

        var redirectUri = location.protocol + '//' + location.host + '/authcomplete.html';

        var externalProviderUrl = ngAuthSettings.apiServiceBaseUri + "api/Account/ExternalLogin?provider=" + provider
                                                                    + "&response_type=token&client_id=" + ngAuthSettings.clientId
                                                                    + "&redirect_uri=" + redirectUri;
        window.$windowScope = $scope;

        var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
    };

    $scope.authCompletedCB = function (fragment) {

        $scope.$apply(function () {

            if (fragment.haslocalaccount == 'False') {

                authService.logOut();

                authService.externalAuthData = {
                    provider: fragment.provider,
                    userName: fragment.external_user_name,
                    externalAccessToken: fragment.external_access_token
                };

                $location.path('/associate');

            }
            else {
                //Obtain access token and redirect to orders
                var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
                authService.obtainAccessToken(externalData).then(function (response) {

                    $location.path('/orders');

                },
             function (err) {
                 $scope.message = err.error_description;
             });
            }

        });
    }
}]);
