﻿'use strict';
app.controller('AssetsController', ['$scope', 'ordersService', 'localStorageService', function ($scope, ordersService, localStorageService) {
    showLoader();
    $scope.userName = localStorageService.get('authorizationData').userName;
    $scope.Page = "Assets";
    localStorageService.remove('searchExpense');
    localStorageService.remove('searchIncoming');


    if (localStorageService.get('projectID') != null && localStorageService.get('projectID') != '' && localStorageService.get('projectID') != undefined) {
        $scope.projectID = localStorageService.get('projectID').projectID;
    }

    $scope.showlist = true;
    $scope.ListOfAssets = [];
    $scope.savedSuccessfully = false;
    $scope.isEditing = false;

    $scope.Asset = {
        assetID: null,
        projectID:null,
        name: "",
        contact: "",
        address: "",
        business: "",
        userID: null,
        applicationUser_Id:null
    };
 

    $scope.addnewasset = function () {
        $scope.Page = "Create New Assets";
        $scope.Asset = {
            assetID: null,
            projectID: null,
            name: "",
            contact: "",
            address: "",
            business: "",
            userID: null,
            applicationUser_Id: null
        };

        $scope.showlist = false;
        $scope.isEditing = false;
    }    
  
    $scope.showlistofassets = function () {
        $scope.showlist = true;
        $scope.isEditing = false;
    }

    //$scope.setProjectID = function (id) {
       
    //    $scope.projectID = id;
      
    //}

    //$scope.getAssetsByProjectID = function (id) {
   
    //    ordersService.getAssetsByProjectID($scope.userName).then(function (results) {
    //        $scope.ListOfAssets = results.data;

    //    }, function (error) {
    //        //alert(error.data.message);
    //    });
    //}



    ordersService.getAssetsByProjectID($scope.userName).then(function (results) {
        $scope.ListOfAssets = results.data;
        hideLoader();
    }, function (error) {
        //alert(error.data.message);
    });


    //$scope.getAll = function () {
    //    ordersService.getAssets().then(function (results) {
    //        $scope.ListOfAssets = results.data;

    //    }, function (error) {
    //        //alert(error.data.message);
    //    });
    //}


    //$scope.getAll();
   


    //ordersService.getProjects($scope.userName).then(function (results) {

    //    $scope.ListOfProjects = results.data;
    //}, function (error) {
    //});


    //$scope.getAssetsByID = function (id) {
    //    ordersService.getAssetsByID(id).then(function (results) {

    //        $scope.Asset = results.data;

    //    }, function (error) {
    //        //alert(error.data.message);
    //    });

    //}


    


    $scope.saveAsset = function () {
        showLoader();
        $scope.Asset.projectID = $scope.projectID;
        ordersService.saveAsset($scope.Asset, $scope.projectID, $scope.userName).then(function (response) {
            $scope.savedSuccessfully = true;
            $scope.message = "Asset has been added successfully";           
            $scope.getAssetsByProjectID($scope.projectID);
            $scope.showlist = true;
            $scope.Page = "Assets";
            $scope.isEditing = false;
            hideLoader();
        },
         function (error) {
            
             $scope.showlist = true;

             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $scope.message = "Failed to add Asset due to:" + errors.join(' ');
             hideLoader();
         });
    };



    $scope.openEditModal = function (Asset) {
        debugger;
        $scope.Page = "Edit Assets";
     
        $scope.Asset = {
            assetID: Asset.assetID,
            projectID: Asset.projectID,
            name: Asset.name,
            contact: Asset.contact,
            address: Asset.address,
            business: Asset.business,
            userID: Asset.userId,
            applicationUser_Id: Asset.applicationUser_Id
        };

        $scope.showlist = false;
        $scope.isEditing = true;
    }



    $scope.updateAsset = function () {
        showLoader();
        //$scope.Asset.projectID = $scope.projectID;

     

        ordersService.updateAsset($scope.Asset).then(function (response) {

            $scope.savedSuccessfully = true;
            $scope.message = "Asset has been updated successfully";
            $scope.getAssetsByProjectID($scope.projectID);
            $scope.showlist = true;
            $scope.isEditing = false;
            $scope.Page = "Assets";
            hideLoader();
        },
         function (response) {
             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $scope.message = "Failed to update Asset due to:" + errors.join(' ');
             hideLoader();
         });
    };

    $scope.deleteAsset = function (id) {
        ordersService.deleteAsset(id).then(function (results) {
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