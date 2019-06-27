'use strict';
app.controller('incomingController', ['$scope', 'ordersService', 'localStorageService', function ($scope, ordersService, localStorageService) {

    $scope.isEditing = false;
    $scope.search = "";
    if (localStorageService.get('searchIncoming') != '' && localStorageService.get('searchIncoming') != null && localStorageService.get('searchIncoming') != undefined)
    {
        $scope.search = localStorageService.get('searchIncoming').name;
    }  
   
    $scope.savedSuccessfully = false;

    $scope.ListOfIncoming = [];

    $scope.userName = localStorageService.get('authorizationData').userName;

    if (localStorageService.get('projectID') != null && localStorageService.get('projectID') != '' && localStorageService.get('projectID') != undefined) {
        $scope.projectID = localStorageService.get('projectID').projectID;
    }




    $scope.getcustomeragain = function () {
        ordersService.getCustomer($scope.userName).then(function (results) {

        
            $scope.ListOfcustomer = results.data;

        }, function (error) {
        });
    }

    ordersService.getCustomer($scope.userName).then(function (results) {
        $scope.ListOfcustomer = results.data;

        console.log($scope.ListOfcustomer);

    }, function (error) {
    });


    $scope.Incoming = {
        IncomingID: null,
        ProjectID: $scope.projectID,
        customerID: 0,
        Date: "",
        Amount: "",
        SourceName: "",
        ReceiptPath: ""
    };


    $scope.setProjectID = function (id) {
        $scope.projectID = id;
    }

    $scope.setProjectID = function (id) {


        $scope.projectID = id;

    }

    
    //ordersService.getIncoming().then(function (results) {     

    //    $scope.ListOfIncoming = results.data;       
    //}, function (error) {
    //    //alert(error.data.message);
    //});

    $scope.removeImage = function () {
        $scope.Incoming.ReceiptPath = "";
    }

    $scope.openEditModal = function (obj) {

        //$scope.search = "";
        localStorageService.remove('searchExpense');
        localStorageService.remove('searchIncoming');

        $scope.Incoming = {
            IncomingID: obj.incomingID,
            ProjectID: obj.projectID,
            Date: obj.date,
            Amount: obj.amount,
            SourceName: obj.sourceName,
            ReceiptPath: obj.receiptPath
        };
        $scope.isEditing = true;
        $scope.showlist = false;
    }


    ordersService.getIncomingByProjectID($scope.projectID).then(function (results) {

        $scope.ListOfIncoming = results.data;

        console.log("lit of incoming");
        console.log($scope.ListOfIncoming);


    }, function (error) {
        //alert(error.data.message);
    });



    $scope.getIncomingsByProjectID = function (id) {

        $scope.Incoming.projectID = id;

        $scope.projectID = id;

        ordersService.getIncomingByProjectID(id).then(function (results) {

            $scope.ListOfIncoming = results.data;

            console.log("lit of incoming");
            console.log($scope.ListOfIncoming);


        }, function (error) {
            //alert(error.data.message);
        });
    }



    ordersService.getProjects($scope.userName).then(function (results) {      
        $scope.ListOfProjects = results.data;
    }, function (error) {
    });



    $scope.showlist = true;


    $scope.showlistofincomings = function () {
        $scope.isEditing = false;
        $scope.showlist = true;
    }



    $scope.addnewincoming = function () {
        $scope.search = "";
        localStorageService.remove('searchExpense');
        localStorageService.remove('searchIncoming');

        $scope.Incoming = {
            IncomingID: null,
            customerID :0,
            ProjectID: null,
            Date: "",
            Amount: "",
            SourceName: ""
        };


        $scope.showlist = false;
        $scope.isEditing = false;
    }



    $scope.getIncomingByID = function (id) {

        ordersService.getIncomingByID(id).then(function (results) {

            $scope.Incoming = results.data;

        }, function (error) {
            //alert(error.data.message);
        });
    }

    $scope.saveIncoming = function () {

        $scope.Incoming.projectID = $scope.projectID;


        console.log("Save Incoming");
        console.log($scope.Incoming);

        ordersService.saveIncoming($scope.Incoming).then(function (response) {

            $scope.showlist = true;

            $scope.savedSuccessfully = true;
            $scope.message = "Incoming has been added successfully";

            $scope.getIncomingsByProjectID($scope.projectID);
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
             $scope.message = "Failed to add Incoming due to:" + errors.join(' ');
         });
    };


    $scope.updateIncoming = function () {
        $scope.Incoming.projectID = $scope.projectID;
        ordersService.updateIncoming($scope.Incoming).then(function (response) {

            $scope.savedSuccessfully = true;
            $scope.message = "Incoming has been updated successfully";

            $scope.getIncomingsByProjectID($scope.projectID);
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
             $scope.message = "Failed to update Incoming due to:" + errors.join(' ');
         });
    };


    $scope.deleteIncoming = function (id) {
        ordersService.deleteIncoming(id).then(function (results) {
            $scope.orders = results.data;
        }, function (error) {
            //alert(error.data.message);
        });
    };

    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }



    function removePaddingCharacters(bytes) {
        bytes = bytes.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, "");

        return bytes;
    }

    $(document.body).on('change', '#fileName', function () {

        var files = event.target.files; //FileList object
        var output = document.getElementById("result");
        var output = document.getElementById("showUploaded");

        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            //Only pics
            if (!file.type.match('image'))
                continue;

            var picReader = new FileReader();

            picReader.addEventListener("load", function (event) {

                var picFile = event.target;

                $scope.Incoming.ReceiptPath = picFile.result;

                output.src = picFile.result;
                output.style.display = "block";
                $scope.$apply();

            });

            //Read the image
            picReader.readAsDataURL(file);
        }
    });


    $scope.makezoom = function (data) {
        $("#imagemodal").modal("show");
        $scope.enlargeimage = data;
    }

}]);