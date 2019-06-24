'use strict';
app.controller('ManufacturerController', ['$scope', 'ordersService', function ($scope, ordersService) {

    function init() {
        $(".menu-toggle").trigger("click");
    }


    init();

    $scope.Manufacturer = {
        ManufacturerID:"",
        Name: null,
        Address: null,        
        Contact: "",
        Category: ""       
    };

    $scope.showlist = true;


    $scope.ListOfManufacturer = [];

    $scope.savedSuccessfully = false;

    $scope.addnewManufacturer = function () {
        $scope.showlist = false;
    }

    function init() {
        $(".menu-toggle").trigger("click");
    }


    init();


    ordersService.getManufacturer().then(function (results) {

        $scope.ListOfManufacturer = results.data;

        console.log("rrrr");

        console.log($scope.ListOfManufacturer);




    }, function (error) {


        //alert(error.data.message);
    });


    ordersService.getManufacturer().then(function (results) {
        $scope.Manufacturer = results.data;

    }, function (error) {
    });



    $scope.getManufacturerByID = function (id) {
        ordersService.getManufacturerByID(id).then(function (results) {

            $scope.Manufacturer = results.data;

        }, function (error) {
            //alert(error.data.message);
        });

    }






    $scope.saveManufacturer = function () {

        ordersService.saveManufacturer($scope.Manufacturer).then(function (response) {


            $scope.savedSuccessfully = true;
            $scope.message = "Manufacturer has been added successfully";

            $scope.showlist = true;

        },
         function (error) {
        
             $scope.showlist = true;

             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $scope.message = "Failed to add Manufacturer due to:" + errors.join(' ');
         });
    };

    $scope.updateManufacturer = function () {

        ordersService.updateManufacturer($scope.Manufacturer).then(function (response) {

            $scope.savedSuccessfully = true;
            $scope.message = "Manufacturer has been updated successfully";

        },
         function (response) {
             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $scope.message = "Failed to update Manufacturer due to:" + errors.join(' ');
         });
    };

    $scope.deleteManufacturer = function (id) {
        ordersService.deleteManufacturer(id).then(function (results) {
            $scope.orders = results.data;
        }, function (error) {
            //alert(error.data.message);
        });
    };


}]);