'use strict';
app.controller('projectController', ['$scope', 'ordersService', 'localStorageService', function ($scope, ordersService, localStorageService) {

    $scope.userName = localStorageService.get('authorizationData').userName;
 
    localStorageService.remove('searchExpense');
    localStorageService.remove('searchIncoming');

    $scope.project = {
        projectID:null,
        name: "",
        billingMethod: "",
        customerID: null,
        TotalCost: ""
    };


    $scope.Customerobject = {

        Name: "",
        Address: "",
        Contact: "",
        CustomerID: 0

    };

    $scope.isEditing = false;
    $scope.savedSuccessfully = false;
    $scope.showlist = true;
    $scope.ListOfProjects = [];

    $scope.getAll = function () {
        ordersService.getProjects($scope.userName).then(function (results) {

            $scope.ListOfProjects = results.data;

            if (localStorageService.get('projectID') == '' || localStorageService.get('projectID') == null || localStorageService.get('projectID') == undefined)
            {
                localStorageService.set('projectID', { projectID: $scope.ListOfProjects[0].projectID });
            }
        }, function (error) {
        });
    }


    $scope.getAll();
    
    $scope.addnewproject = function () {
        $scope.project = {
            projectID: null,
            name: "",
            billingMethod: "",
            customerID: null,
            totalCost: ""
        };


        $scope.showlist = false;
        $scope.isEditing = false;
    }

    $scope.showprojectlist = function () {
        $scope.showlist = true;
        $scope.isEditing = false;
    }

    $scope.openEditModal = function (project) {      

        $scope.project = {
            projectID: project.projectID,
            name: project.name,
            billingMethod: project.billingMethod,
            customerID: project.customerID,
            totalCost: project.totalCost
        };
        $scope.isEditing = true;
        $scope.showlist = false;
       
    }



    $scope.saveNewCustomer = function () {
        ordersService.saveCustomer($scope.Customerobject,$scope.userName).then(function (response) {

            $("#customermodal").modal("hide");

            debugger;

            $scope.getcustomeragain();

            setTimeout(function () {

                debugger;

                $scope.project.customerID = response.data.customerID;
                $scope.$apply();

            }, 1500)

            $scope.savedSuccessfully = true;
            $scope.message = "Category has been added successfully";

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

    $scope.getcustomeragain = function () {
        ordersService.getCustomer($scope.userName).then(function (results) {

            debugger;
            $scope.ListOfcustomer = results.data;

        }, function (error) {
        });
    }
  
    ordersService.getCustomer($scope.userName).then(function (results) {
        $scope.ListOfcustomer = results.data;

        console.log($scope.ListOfcustomer);

    }, function (error) {
    });

    $scope.newcustomer = function () {
        $("#customermodal").modal("show");
    }


    $scope.getProjectByID = function (id) {

        ordersService.getProjectByID(id).then(function (results) {

            $scope.project = results.data;
           
        }, function (error) {
            //alert(error.data.message);
        });
    }    
    

    $scope.saveProject = function () {

        ordersService.saveProject($scope.project, $scope.userName).then(function (response) {

            $scope.savedSuccessfully = true;
            $scope.message = "Project has been added successfully";

            $scope.getAll();
            $scope.showlist = true;
            $scope.isEditing = false;
        },
         function (response) {
             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $scope.message = "Failed to add project due to:" + errors.join(' ');
         });
    };


    $scope.updateProject = function () {

        ordersService.updateProject($scope.project, $scope.userName).then(function (response) {

            $scope.savedSuccessfully = true;
            $scope.message = "Project has been updated successfully";

            $scope.getAll();
            $scope.showlist = true;
            $scope.isEditing = false;
        },
         function (response) {
             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $scope.message = "Failed to add update due to:" + errors.join(' ');
         });
    };


    $scope.deleteProject = function (id) {
        ordersService.deleteProject(id).then(function (results) {
            $scope.orders = results.data;
        }, function (error) {
            //alert(error.data.message);
        });
    };


    
    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

}]);