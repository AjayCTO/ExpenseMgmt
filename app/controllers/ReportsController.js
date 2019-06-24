'use strict';
app.controller('ReportsController', ['$scope', '$rootScope', 'ordersService', 'localStorageService', 'SweetAlert', function ($scope, $rootScope, ordersService, localStorageService, SweetAlert) {

    $scope.search = "";

    if (localStorageService.get('searchExpense') != '' && localStorageService.get('searchExpense') != null && localStorageService.get('searchExpense') != undefined) {
        $scope.search = localStorageService.get('searchExpense').name;
    }


    function init() {
        $(".menu-toggle").trigger("click");
    }


    init();

    $scope.showlist = true;

    $scope.newcategoryname = "";

    $scope.savedSuccessfully = false;

    $scope.ListOfExpenses = [];

    $scope.userName = localStorageService.get('authorizationData').userName;

    if (localStorageService.get('projectID') != null && localStorageService.get('projectID') != '' && localStorageService.get('projectID') != undefined) {
        $scope.projectID = localStorageService.get('projectID').projectID;
    }

    $scope.isEditing = false;

    $scope.Expense = {
        ExpenseID: null,
        ProjectID: null,
        AssetID: null,
        CategoryID: null,
        SupplierID: null,
        Date: "",
        Amount: "",
        Refrence: "",
        ReceiptPath: "",
        IsApproved: "",
        Description: ""
    };

    $scope.Categoryobject = {
        CategoryID: null,
        ProjectID: 0,
        Name: "",
        Description: ""
    };

    $scope.Assetobject = {
        AssetID: null,
        ProjectID: 0,
        Name: "",
        Contact: "",
        Address: "",
        Business: "",
        UserID: null,
        ApplicationUser_Id: null
    };

    $scope.Supplierobject = {

        Name: "",
        Address: "",
        Contact: "",
        ProjectID: 0

    };

    $scope.removeImage = function () {
        $scope.Expense.ReceiptPath = "";
    }


    $scope.openEditModal = function (obj) {
        //$scope.search = "";
        localStorageService.remove('searchExpense');
        localStorageService.remove('searchIncoming');

        $scope.projectID = obj.projectID;

        $scope.Expense = {
            ExpenseID: obj.expenseID,
            ProjectID: obj.projectID,
            AssetID: obj.assetID,
            CategoryID: obj.categoryID,
            SupplierID: obj.supplierID,
            Date: obj.date,
            Amount: obj.totalAmount,
            Refrence: obj.refrence,
            ReceiptPath: obj.receiptPath,
            IsApproved: obj.isApproved,
            Description: obj.description
        };

        $scope.getdatabyid(obj.projectID);


        $scope.isEditing = true;
        $scope.showlist = false;

    }




    $scope.addnewexpense = function () {

        $scope.search = "";

        localStorageService.remove('searchExpense');
        localStorageService.remove('searchIncoming');

        $scope.Expense = {
            ExpenseID: null,
            ProjectID: null,
            AssetID: null,
            CategoryID: null,
            SupplierID: null,
            Date: "",
            Amount: "",
            Refrence: "",
            ReceiptPath: "",
            IsApproved: "",
            Description: ""
        };


        $scope.showlist = false;
        $scope.isEditing = false;
    }

    $scope.showexpenselist = function () {
        $scope.showlist = true;
        $scope.isEditing = false;
    }


    $scope.getExpenseByProjectID = function (id) {     

        $scope.projectID = id;

        $scope.Expense.AssetID = 0;
        $scope.Expense.SupplierID = 0;

        ordersService.getExpenseByProjectID(id).then(function (results) {

            $scope.ListOfExpenses = results.data;

           
            $scope.total = 0;
            for (var i = 0; i < $scope.ListOfExpenses.length; i++) {
               
                $scope.total += $scope.ListOfExpenses[i].totalAmount;
            }

           
            $scope.getdatabyid(id);

        }, function (error) {

            //alert(error.data.message);
        });
    }



    $scope.getExpenseByAssetID = function (id) {            

       
        $scope.Expense.SupplierID = 0;

        ordersService.getExpenseByAssetID(id, $scope.projectID).then(function (results) {

            $scope.ListOfExpenses = results.data;

            //$scope.getdatabyid(id);
            $scope.total = 0;
            for (var i = 0; i < $scope.ListOfExpenses.length; i++) {

                $scope.total += $scope.ListOfExpenses[i].totalAmount;
            }
        }, function (error) {

            //alert(error.data.message);
        });
    }



    $scope.getExpenseBySupplierID = function (id) {   

       
        $scope.Expense.AssetID = 0;

        ordersService.getExpenseBySupplierID(id, $scope.projectID).then(function (results) {

            $scope.ListOfExpenses = results.data;

            //$scope.getdatabyid(id);
            $scope.total = 0;
            for (var i = 0; i < $scope.ListOfExpenses.length; i++) {

                $scope.total += $scope.ListOfExpenses[i].totalAmount;
            }
        }, function (error) {

            //alert(error.data.message);
        });
    }







    ordersService.getExpenseByProjectID($scope.projectID).then(function (results) {

        $scope.ListOfExpenses = results.data;
        $scope.total = 0;
        for (var i = 0; i < $scope.ListOfExpenses.length; i++) {

            $scope.total += $scope.ListOfExpenses[i].totalAmount;
        }
        $scope.getdatabyid($scope.projectID);

    }, function (error) {

        //alert(error.data.message);
    });

    ordersService.getProjects($scope.userName).then(function (results) {

        $scope.ListOfProjects = results.data;
    }, function (error) {
    });


    //$scope.getAll = function () {
    //    ordersService.getExpense($scope.userName).then(function (results) {

    //        $scope.ListOfExpenses = results.data;           

    //    }, function (error) {

    //        //alert(error.data.message);
    //    });
    //}


    //$scope.getAll();

    $scope.getdatabyid = function (id) {



        $scope.projectID = id;

        $scope.Expense.ProjectID = id;
        $scope.Categoryobject.ProjectID = id;
        $scope.Assetobject.ProjectID = id;
        $scope.Supplierobject.ProjectID = id;
        ordersService.getCategoryByID(id).then(function (results) {

            $scope.categories = results.data;

        }, function (error) {

            //alert(error.data.message);
        });


        ordersService.getSupplierByID($scope.userName).then(function (results) {


            $scope.suppliers = results.data;

        }, function (error) {
            //alert(error.data.message);
        });


        ordersService.getAssetsByID($scope.userName).then(function (results) {


            $scope.assets = results.data;

        }, function (error) {
            //alert(error.data.message);
        });
    }


    $scope.saveNewCategory = function () {



        ordersService.saveCategory($scope.Categoryobject).then(function (response) {

            $("#categorymodal").modal("hide");

            debugger;

            $scope.getcategoryagain()

            setTimeout(function () {

                debugger;

                $scope.Expense.CategoryID = response.data.categoryID;
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



    $scope.saveNewAsset = function () {
        ordersService.saveAsset($scope.Assetobject).then(function (response) {

            $("#assetmodal").modal("hide");

            debugger;

            $scope.getassetsagain();

            setTimeout(function () {

                debugger;

                $scope.Expense.AssetID = response.data.assetID;
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


    $scope.saveNewSupplier = function () {



        ordersService.saveSupplier($scope.Supplierobject).then(function (response) {

            $("#suppliermodal").modal("hide");

            debugger;

            $scope.getsupplieragain();

            setTimeout(function () {

                debugger;

                $scope.Expense.SupplierID = response.data.supplierID;
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



    //ordersService.getProjects().then(function (results) {
    //    $scope.projects = results.data;

    //}, function (error) {
    //});


    $scope.getassetsagain = function () {
        ordersService.getAssetsByID($scope.projectID).then(function (results) {

            $scope.assets = results.data;

        }, function (error) {
            //alert(error.data.message);
        });
    }



    //ordersService.getAssets().then(function (results) {

    //    $scope.assets = results.data;

    //}, function (error) {

    //    //alert(error.data.message);
    //});


    $scope.getcategoryagain = function () {
        ordersService.getCategoryByID($scope.projectID).then(function (results) {

            $scope.categories = results.data;

        }, function (error) {

            //alert(error.data.message);
        });
    }


    //ordersService.getCategory().then(function (results) {     
    //    $scope.categories = results.data;      

    //}, function (error) {
    //});


    $scope.getsupplieragain = function () {
        ordersService.getSupplierByID($scope.projectID).then(function (results) {

            $scope.suppliers = results.data;

        }, function (error) {
            //alert(error.data.message);
        });
    }


    //ordersService.getSupplier().then(function (results) {

    //    debugger;
    //    $scope.suppliers = results.data;

    //}, function (error) {
    //});


    $scope.newcategory = function () {


        $("#categorymodal").modal("show");
    }

    $scope.newasset = function () {


        $("#assetmodal").modal("show");
    }


    $scope.newsupplier = function () {


        $("#suppliermodal").modal("show");
    }



    $scope.getExpenseByID = function (id) {
        ordersService.getExpenseByID(id).then(function (results) {
            $scope.Expense = results.data;

        }, function (error) {
            //alert(error.data.message);
        });

    }




    $scope.saveExpense = function () {

        $scope.Expense.ProjectID = $scope.projectID;


        ordersService.saveExpense($scope.Expense, $scope.userName).then(function (response) {
            $scope.savedSuccessfully = true;
            $scope.message = "Expense has been added successfully";
            $scope.getExpenseByProjectID($scope.projectID);
            $scope.showlist = true;
            $scope.isEditing = false;

            swal("Expense Added Successfully !!", "", "success")

        },
         function (error) {
             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $scope.message = "Failed to add Expense due to:" + errors.join(' ');
         });
    };


    $scope.updateExpense = function () {

        $scope.Expense.ProjectID = $scope.projectID;

        ordersService.updateExpense($scope.Expense, $scope.userName).then(function (response) {

            $scope.savedSuccessfully = true;
            $scope.message = "Expense has been updated successfully";
            $scope.getExpenseByProjectID($scope.projectID);
            $scope.showlist = true;
            $scope.isEditing = false;
            swal("Expense Updated Successfully !!", "", "info")
        },
         function (response) {
             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $scope.message = "Failed to update Expense due to:" + errors.join(' ');
         });
    };


    $scope.deleteExpense = function (id) {
        ordersService.deleteExpense(id).then(function (results) {
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


    $scope.makezoom = function (data) {
        $("#imagemodal").modal("show");
        $scope.enlargeimage = data;
    }



    $(document.body).on('change', '#fileName', function () {

        var files = event.target.files; //FileList object
        var output = document.getElementById("result");

        for (var i = 0; i < files.length; i++) {
            var file = files[i];



            //Only pics
            if (!file.type.match('image'))
                continue;

            var picReader = new FileReader();

            picReader.addEventListener("load", function (event) {



                var picFile = event.target;

                $scope.Expense.ReceiptPath = picFile.result;

                var output = document.getElementById("showUploaded");
                output.src = picFile.result;
                output.style.display = "block";

                $scope.$apply();



            });

            //Read the image
            picReader.readAsDataURL(file);
        }
    });




}]);


