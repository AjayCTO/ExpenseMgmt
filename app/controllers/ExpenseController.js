'use strict';
app.controller('ExpenseController', ['$scope', '$rootScope', 'ordersService', 'localStorageService', 'SweetAlert', function ($scope, $rootScope, ordersService, localStorageService, SweetAlert) {
    showLoader();
    $scope.search = "";
    $scope.Page="Expense"
    if (localStorageService.get('searchExpense') != '' && localStorageService.get('searchExpense') != null && localStorageService.get('searchExpense') != undefined) {
        $scope.search = localStorageService.get('searchExpense').name;
    }

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
        SupplierID:null,
        Date: "",
        Amount: 0,
        Refrence: "",
        ReceiptPath: "",
        IsApproved: "",
        Description: "",
        PaidAmount: 0
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
        ProjectID:0
      
    };

    $scope.removeImage = function () {
        $scope.Expense.ReceiptPath = "";
    }


    $scope.openEditModal = function (obj) {      
        //$scope.search = "";

        $scope.Page="Edit Expense"
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
        $scope.Page = "Create New Expense";
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
            Description: "",
            AmountPaid:""
        };


        $scope.showlist = false;
        $scope.isEditing = false;
    }

    $scope.showexpenselist = function () {
        $scope.showlist = true;
        $scope.isEditing = false;
        $scope.Page = "Expense";
    }

    $scope.capturePhotoNew = function () {   
        navigator.camera.getPicture($scope.onPhotoDataSuccessNew, $scope.onFail, {
            quality: 50,
            targetWidth: 350,
            targeHeight: 350,
            correctOrientation: true,
            destinationType: destinationType.DATA_URL,
            allowEdit: true,
            saveToPhotoAlbum: true,
        });
    }
    $scope.getPhoto = function (source) {
        // Retrieve image file location from specified source
        navigator.camera.getPicture($scope.onPhotoURISuccessNew, $scope.onFail, {
            quality: 50,
            targetWidth: 350,
            targeHeight: 350,
            destinationType: destinationType.DATA_URL,
            correctOrientation: true,
            allowEdit: true,
            sourceType: pictureSource.PHOTOLIBRARY
        });
    }

    $scope.openfile = function () {

        $("#myModalforlist").modal("show");
    }

    $scope.onPhotoURISuccessNew = function () {

        imageData = "data:image/jpeg;base64," + imageData;


        $("#showUploaded123").attr("src", imageData);
        $("#myModalforlist").modal("hide");

        //var _ImgObj = { ImageID: 0, FileName: "", bytestring: "", Size: 0 }

        //imageData = "data:image/jpeg;base64," + imageData;

        //var id = randomStringNew(5, '0123456789');
        //_ImgObj.ImageID = id;

        //$(".viewimage").show();
        //$("#myModalforlist").modal("hide");

        //var currentdate = new Date();
        //var datetime = currentdate.getDate() + "/"
        //            + (currentdate.getMonth() + 1) + "/"
        //            + currentdate.getFullYear() + "@"
        //            + currentdate.getHours() + ":"
        //            + currentdate.getMinutes() + ":"
        //            + currentdate.getSeconds();


        //_ImgObj.FileName = localStorageService.get('AccountID') + datetime;
        ////  _ImgObj.FileName = "IphoneLibrary";
        //_ImgObj.bytestring = imageData;
        //$scope.Image = _ImgObj;


        ////updated
        //$scope.myImage = '';
        //$scope.myCroppedImage = '';

        //$scope.myImage = imageData;



        //CheckScopeBeforeApply();

        //UsFullImg = true;


        //$scope.uploadProfile();

    }


    $scope.onPhotoDataSuccessNew = function (imageData) {

        var realdata = imageData;
        imageData = "data:image/jpeg;base64," + imageData;
        

        $("#showUploaded123").attr("src", imageData);
        $("#myModalforlist").modal("hide");
        $scope.Expense.ReceiptPath = realdata;
    }


    $scope.onFail = function (message) {
        log.error('Failed because: ' + message);
    }




    $scope.getExpenseByProjectID = function (id) {
        showLoader();
        $scope.projectID = id;

        ordersService.getExpenseByProjectID(id).then(function (results) {

            $scope.ListOfExpenses = results.data;         
            hideLoader();
            //$scope.getdatabyid(id);

        }, function (error) {

            //alert(error.data.message);
        });
    }
    


    ordersService.getExpenseByProjectID($scope.projectID).then(function (results) {
        debugger;
        $scope.ListOfExpenses = results.data;
        hideLoader();
        //$scope.getdatabyid($scope.projectID);


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

        showLoader();

        $scope.projectID = id;

        $scope.Expense.ProjectID = id;
        $scope.Categoryobject.ProjectID = id;
        $scope.Assetobject.ProjectID = id;
        $scope.Supplierobject.ProjectID = id;
            ordersService.getCategoryByID(id).then(function (results) {

                $scope.categories = results.data;
                hideLoader();
            }, function (error) {
                hideLoader();
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

    

            $scope.getcategoryagain()

            setTimeout(function () {

            

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
        ordersService.saveAsset($scope.Assetobject, $scope.projectID, $scope.userName).then(function (response) {

            $("#assetmodal").modal("hide");

       

            $scope.getassetsagain();

            setTimeout(function () {

            

                $scope.Expense.AssetID = response.data.assetID;
                $scope.$apply();

            },1500)

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



        ordersService.saveSupplier($scope.Supplierobject, $scope.projectID, $scope.userName).then(function (response) {

            $("#suppliermodal").modal("hide");

    

            $scope.getsupplieragain();

            setTimeout(function () {

          

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
        ordersService.getAssetsByID($scope.userName).then(function (results) {

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
        ordersService.getSupplierByID($scope.userName).then(function (results) {

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
        debugger;
        ordersService.getExpenseByID(id).then(function (results) {
            $scope.Expense = results.data;

        }, function (error) {
            //alert(error.data.message);
        });

    }


    

    $scope.saveExpense = function () {
        showLoader();
        debugger;
        $scope.Expense.ProjectID = $scope.projectID;
            

        ordersService.saveExpense($scope.Expense, $scope.userName).then(function (response) {
   
            $scope.savedSuccessfully = true;
            $scope.message = "Expense has been added successfully";
            $scope.getExpenseByProjectID($scope.projectID);
            $scope.showlist = true;
            $scope.Page = "Expense";
            $scope.isEditing = false;

            //swal("Expense Added Successfully !!", "", "success")
          hideLoader();
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
        showLoader();
        $scope.Expense.ProjectID = $scope.projectID;

        ordersService.updateExpense($scope.Expense, $scope.userName).then(function (response) {
         
            $scope.Page = "Expense";
            $scope.savedSuccessfully = true;
            $scope.message = "Expense has been updated successfully";
            $scope.getExpenseByProjectID($scope.projectID);
            $scope.showlist = true;
            $scope.isEditing = false;
            //swal("Expense Updated Successfully !!", "", "info")
            hideLoader();
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


