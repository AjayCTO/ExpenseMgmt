'use strict';
app.controller('CustomerController', ['$scope', 'ordersService', 'localStorageService', function ($scope, ordersService, localStorageService) {

    function init() {
        $(".menu-toggle").trigger("click");
    }


    init();
    $scope.userName = localStorageService.get('authorizationData').userName;

    $scope.projectID = localStorageService.get('projectID').projectID;

    $scope.isEditing = false;

    $scope.Category = {
        CategoryID: null,
        ProjectID: null,
        name: "",
        description: ""
    };

    $scope.ListOfCategories = [];

    $scope.savedSuccessfully = false;

    $scope.openEditModal = function (category) {

        $scope.projectID = category.projectID;

        $scope.Category = {
            categoryID: category.categoryID,
            projectID: category.projectID,
            name: category.name,
            description: category.description
        };
        $scope.isEditing = true;
        $scope.showlist = false;
    }


    $scope.showcategorylist = function () {
        $scope.showlist = true;
        $scope.isEditing = false;
    }

    ordersService.getProjects($scope.userName).then(function (results) {

        $scope.ListOfProjects = results.data;
    }, function (error) {
    });



    $scope.showlist = true;

    //GetAll
    //ordersService.getCategory().then(function (results) {

    //    $scope.ListOfCategories = results.data;

    //}, function (error) {
    //    //alert(error.data.message);
    //});

    //Get By Project ID.
    ordersService.getCategoryByID($scope.projectID).then(function (results) {

        $scope.ListOfCategories = results.data;

    }, function (error) {
        //alert(error.data.message);
    });


    $scope.getCategoryByProjectID = function (id) {

        $scope.projectID = id;

        ordersService.getCategoryByID(id).then(function (results) {

            $scope.ListOfCategories = results.data;

        }, function (error) {
            //alert(error.data.message);
        });

    }

    $scope.addnewcategory = function () {

        $scope.Category = {
            CategoryID: null,
            ProjectID: null,
            name: "",
            description: ""
        };

        $scope.showlist = false;
        $scope.isEditing = false;
    }


    $scope.showprojectlist = function () {
        $scope.showlist = true;
        $scope.isEditing = false;
    }

    $scope.saveCategory = function () {
        $scope.Category.ProjectID = $scope.projectID;
        ordersService.saveCategory($scope.Category).then(function (response) {

            $scope.savedSuccessfully = true;
            $scope.message = "Category has been added successfully";

            $scope.getCategoryByProjectID($scope.projectID);
            $scope.isEditing = false;
            $scope.showlist = true;
        },
         function (response) {
             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $scope.message = "Failed to add Category due to:" + errors.join(' ');
         });
    };


    $scope.updateCategory = function () {


        $scope.Category.ProjectID = $scope.projectID;

        ordersService.updateCategory($scope.Category).then(function (response) {

            $scope.savedSuccessfully = true;
            $scope.message = "Category has been updated successfully";

            $scope.getCategoryByProjectID($scope.projectID);
            $scope.isEditing = false;
            $scope.showlist = true;
        },
         function (response) {
             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $scope.message = "Failed to update Category due to:" + errors.join(' ');
         });
    };


    $scope.deleteCategory = function (id) {
        ordersService.deleteCategory(id).then(function (results) {
            $scope.orders = results.data;
        }, function (error) {
            //alert(error.data.message);
        });
    };



}]);