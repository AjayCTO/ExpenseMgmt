'use strict';
app.controller('homeController', ['$scope', 'ordersService', 'localStorageService', function ($scope, ordersService, localStorageService) {

    showLoader();
    localStorageService.remove('searchExpense');
    localStorageService.remove('searchIncoming');


    if (localStorageService.get('projectID') != null && localStorageService.get('projectID') != '' && localStorageService.get('projectID') != undefined)
    {
        $scope.projectID = localStorageService.get('projectID').projectID;
    }


    //$scope.projectID = localStorageService.get('projectID').projectID;
    $scope.userName = localStorageService.get('authorizationData').userName;
    

   
    //$scope.Projectname = "My Project";
    //$scope.totalcost = 1255;
    //$scope.totalexpense = 1000;
    //$scope.totalincoming = 300;


    $scope.getTransactionByID = function (id) {

        showLoader();
        localStorageService.set('projectID', { projectID: id });

        ordersService.getTransactionByID(id).then(function (results) {   

            $scope.Projectname = results.data.projectName;
            $scope.totalcost = results.data.totalCost
            $scope.totalexpense = results.data.totalExpense
            $scope.totalincoming = results.data.totalIncoming
         hideLoader();

        }, function (error) {
            //alert(error.data.message);
        });


        ordersService.getExpenseByProjectID(id).then(function (results) {

            $scope.ListOfExpenses = results.data;         
        

        }, function (error) {

            //alert(error.data.message);
        });


        ordersService.getIncomingByProjectID(id).then(function (results) {

            $scope.ListOfIncomings = results.data;
          

        }, function (error) {

            //alert(error.data.message);
        });


        ordersService.getAssetsByProjectID($scope.userName).then(function (results) {

            $scope.ListOfAssets = results.data;

            console.log("list of ass");
            console.log($scope.ListOfAssets);
        }, function (error) {

            //alert(error.data.message);
        });
        

    }
    

    $scope.openIncomingPage = function (name) {

        localStorageService.set('searchIncoming', { name: name });

        window.open("#/incoming");
    }


    $scope.openExpensePage = function (name) {

        localStorageService.set('searchExpense', { name: name });

        window.open("#/expense");
    }

    ordersService.getProjects($scope.userName).then(function (results) {

        $scope.ListOfProjects = results.data;

        localStorageService.set('projectID', { projectID: $scope.ListOfProjects[0].projectID });

        if ($scope.projectID == '' || $scope.projectID == null || $scope.projectID == undefined) {
            $scope.getTransactionByID($scope.ListOfProjects[0].projectID);
        }
        else {
            $scope.getTransactionByID($scope.projectID);
        }      

    }, function (error) {
    });


    $scope.makezoom = function (data) {
        $("#imagemodal").modal("show");
        $scope.enlargeimage = data;
    }



    //ordersService.getExpense($scope.userName).then(function (results) {

    //    $scope.ListOfExpenses = results.data;
    //    console.log($scope.ListOfExpenses);

    //}, function (error) {

    //    //alert(error.data.message);
    //});

    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
   
}]);