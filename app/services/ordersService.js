'use strict';
app.factory('ordersService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

  

    var ordersServiceFactory = {};

    var _getOrders = function () {
        return $http.get(serviceBase + 'api/orders').then(function (results) {
            return results;
        });
    };


    ///////////////////////////////////////////////////////////////////////////////

    var _getProjects = function (userName) {

        
        return $http.get(serviceBase + 'api/Projects/GetProjects', { params: { userName: userName } }).then(function (results) {

            return results;
        });
    };


    var _forgotPassword = function (Email) {

        debugger;
        return $http.get(serviceBase + 'api/Account/ForgotPassword', { params: { EmailAddress: Email } }).then(function (results) {

            return results;
        });
    };

 


    var _getProjectByID = function (id) {
        return $http.get(serviceBase + 'api/Projects/GetProject', { params: { id: id } }).then(function (results) {
            return results;
        });
    };

    var _saveProject = function (project1, Name) {

        var projectUserModel = { Project: project1, UserName: Name };
        return $http.post(serviceBase + 'api/Projects/PostProject', projectUserModel).then(function (response) {
            return response;
        });
    };

    var _updateProject = function (project, Name) {
     
        var projectUserModel = { Project: project, UserName: Name };
        return $http.put(serviceBase + 'api/Projects/PutProject', projectUserModel).then(function (response) {
            return response;
        });
    };


    var _deleteProject = function (id) {
      
        return $http.delete(serviceBase + 'api/Projects/DeleteProject', { params: { id: id } }).then(function (results) {
            return results;
        });
    };


    //////////////////////////////////////////////////////////////////////////////////////////////

    var _getAssets = function () { 
        return $http.get(serviceBase + 'api/Assets').then(function (results) {
            return results;
        });
    };


    var _getAssetsByID = function (userName) {
        return $http.get(serviceBase + 'api/Assets/GetAsset', { params: { userName: userName } }).then(function (results) {
            return results;
        });
    };


    var _getAssetsByProjectID = function (userName) {
        return $http.get(serviceBase + 'api/Assets/GetAssetByProjectID', { params: { userName: userName } }).then(function (results) {
            return results;
        });
    };




    var _deleteAsset = function (id) {
        return $http.get(serviceBase + 'api/Assets/DeleteAsset', { params: { id: id } }).then(function (results) {
            return results;
        });
    };




    var _saveAsset = function (Asset, projectID, userName) {
        var assetPostModel = {Asset : Asset , projectId : projectID,UserName : userName}

        return $http.post(serviceBase + 'api/Assets/PostAsset', assetPostModel).then(function (response) {
            return response;
        });
    };


    var _updateAsset = function (Asset) {
        return $http.put(serviceBase + 'api/Assets/PutAsset', Asset).then(function (response) {
            return response;
        });
    };

    /////////////////////////////////////////////////////////////////////

    var _getCategory = function () {
        return $http.get(serviceBase + 'api/Categories').then(function (results) {
            return results;
        });
    };

    var _getCategoryByID = function (id) {
        return $http.get(serviceBase + 'api/Categories/GetCategory', { params: { id: id } }).then(function (results) {
            return results;
        });
    };

    var _deleteCategory = function (id) {
        return $http.delete(serviceBase + 'api/Categories/DeleteCategory', { params: { id: id } }).then(function (results) {
            return results;
        });
    };


    var _saveCategory = function (Category) {
        return $http.post(serviceBase + 'api/Categories/PostCategory', Category).then(function (response) {
            return response;
        });
    };


    var _updateCategory = function (Category) {
        return $http.put(serviceBase + 'api/Categories/PutCategory', Category).then(function (response) {
            return response;
        });
    };


    //////////////////////////////////////////////////////////////////////////////


    var _getExpense = function (userName) {
        return $http.get(serviceBase + 'api/Expenses/GetExpense', { params: { userName: userName } }).then(function (results) {
            return results;
        });
    };


    var _getExpenseByID = function (id) {
        return $http.get(serviceBase + 'api/Expenses/GetExpense', { params: { id: id } }).then(function (results) {
            return results;
        });
    };

    var _getExpenseByProjectID = function (id) {
        return $http.get(serviceBase + 'api/Expenses/GetExpenseByProjectID', { params: { id: id } }).then(function (results) {
            return results;
        });
    };

  
    var _getExpenseByAssetID = function (id, projectID) {

        if (projectID != 0) {
            return $http.get(serviceBase + 'api/Expenses/GetExpenseByAssetID', { params: { id: id, projectID: projectID } }).then(function (results) {
                return results;
            });
        }
        else {
            return $http.get(serviceBase + 'api/Expenses/GetExpenseByAssetID', { params: { id: id} }).then(function (results) {
                return results;
            });
        }       
    };


    var _getExpenseBySupplierID = function (id, projectID) {

        if (projectID != 0) {
            return $http.get(serviceBase + 'api/Expenses/GetExpenseBySupplierID', { params: { id: id, projectID: projectID } }).then(function (results) {
                return results;
            });
        }
        else {
            return $http.get(serviceBase + 'api/Expenses/GetExpenseBySupplierID', { params: { id: id} }).then(function (results) {
                return results;
            });
        }        
    };


    var _saveExpense = function (Expense, userName) {

        var expenseUserModel = { Expense: Expense, userName: userName };

        return $http.post(serviceBase + 'api/Expenses/PostExpense', expenseUserModel).then(function (response) {
            return response;
        });
    };


    var _updateExpense = function (Expense, userName) {

        var expenseUserModel = { Expense: Expense, userName: userName };

        return $http.put(serviceBase + 'api/Expenses/PutExpense', expenseUserModel).then(function (response) {
            return response;
        });
    };

    var _deleteExpense = function (id) {
        return $http.delete(serviceBase + 'api/Expenses/DeleteExpense', { params: { id: id } }).then(function (results) {
            return results;
        });
    };



    //////////////////////////////////////////////////////////////////////////////////////////

    var _getIncoming = function () {


        return $http.get(serviceBase + 'api/Incomings').then(function (results) {
            return results;
        });
    };

  
    var _getIncomingByID = function (id) {
        return $http.get(serviceBase + 'api/Incomings/GetIncoming', { params: { id: id } }).then(function (results) {
            return results;
        });
    };


    var _getIncomingByProjectID = function (id) {
        return $http.get(serviceBase + 'api/Incomings/GetIncomingByProjectID', { params: { id: id } }).then(function (results) {
            return results;
        });
    };


    var _saveIncoming = function (Incoming) {
        return $http.post(serviceBase + 'api/Incomings/PostIncoming', Incoming).then(function (response) {
            return response;
        });
    };


    var _updateIncoming = function (Incoming) {
        return $http.put(serviceBase + 'api/Incomings/PutIncoming', Incoming).then(function (response) {
            return response;
        });
    };


    var _deleteIncoming = function (id) {
        return $http.delete(serviceBase + 'api/Incomings/DeleteIncoming', { params: { id: id } }).then(function (response) {
            return response;
        });
    };





    var _getCustomer = function (userName) {

        return $http.get(serviceBase + 'api/Customers/GetCustomer', { params: { userName: userName } }).then(function (results) {
            return results;
        });
    };

    var _saveCustomer = function (Customer, userName) {

        var customerUserNameModel = { Customer: Customer, UserName: userName }

        return $http.post(serviceBase + 'api/Customers/PostCustomer', customerUserNameModel).then(function (response) {
            return response;
        });
    };


    var _ResetPassword = function (otpform) {

        debugger;
        return $http.post(serviceBase + 'api/Account/Resetpassword', otpform).then(function (results) {

            return results;
        });
    };



    ////////////////////////////////////////////////////////////////////

    var _getSupplier = function () {
        return $http.get(serviceBase + 'api/Suppliers').then(function (results) {            
            return results;
        });
    };


    var _getSupplierByID = function (userName) {
        return $http.get(serviceBase + 'api/Suppliers/GetSupplier', { params: { userName: userName } }).then(function (results) {
            return results;
        });
    };


    var _getSupplierByIDdForEdit = function (id) {   
        return $http.get(serviceBase + 'api/Suppliers/SupplierByID', { params: { id: id } }).then(function (results) {
            return results;
        });
    };


    var _saveSupplier = function (Supplier,userName) {      

        var supplierProjectModel = {Supplier:Supplier,UserName:userName}


        return $http.post(serviceBase + 'api/Suppliers/PostSupplier', supplierProjectModel).then(function (response) {
            return response;
        });
    };


    var _updateSupplier = function (Supplier) {
        return $http.put(serviceBase + 'api/Suppliers/PutSupplier', Supplier).then(function (response) {
            return response;
        });
    };


    var _deleteSupplier = function (id) {
        return $http.delete(serviceBase + 'api/Suppliers/DeleteSupplier', { params: { id: id } }).then(function (response) {
            return response;
        });
    };


    /////////////////////////////////////////////////////////////////////////////

    var _getManufacturer = function () {
        return $http.get(serviceBase + 'api/Manufacturers').then(function (results) {
            return results;
        });
    };


    var _getManufacturerByID = function (id) {
        return $http.get(serviceBase + 'api/Manufacturers/GetManufacturer', { params: { id: id } }).then(function (results) {
            return results;
        });
    };

    var _saveManufacturer = function (Manufacturer) {
        return $http.post(serviceBase + 'api/Manufacturers/PostManufacturer', Manufacturer).then(function (response) {
            return response;
        });
    };


    var _updateManufacturer = function (Manufacturer) {
        return $http.put(serviceBase + 'api/Manufacturers/PutManufacturer', Manufacturer).then(function (response) {
            return response;
        });
    };


    var _deleteManufacturer = function (id) {
        return $http.delete(serviceBase + 'api/Manufacturers/DeleteManufacturer', { params: { id: id } }).then(function (response) {
            return response;
        });
    };


    var _customMethod = function (obj)
    {
        console.log("Custom Method");
        console.log(obj);

        return $http.get(serviceBase + 'api/Suppliers/SupplierByID', { params: { id: obj.supplierID } }).then(function (response) {
            return response;
        });

    }

    var _getTransactionByID = function (id) {
        return $http.get(serviceBase + 'api/Transactions/GetTransaction', { params: { id: id } }).then(function (results) {
            return results;
        });
    };




    ordersServiceFactory.getOrders = _getOrders;

    ordersServiceFactory.forgotPassword = _forgotPassword;
    ordersServiceFactory.ResetPassword = _ResetPassword;
    ordersServiceFactory.getProjects = _getProjects;
    ordersServiceFactory.saveProject = _saveProject;
    ordersServiceFactory.getProjectByID = _getProjectByID;
    ordersServiceFactory.updateProject = _updateProject;
    ordersServiceFactory.deleteProject = _deleteProject;


    ordersServiceFactory.getAssets = _getAssets;
    ordersServiceFactory.saveAsset = _saveAsset; 
    ordersServiceFactory.getAssetsByID = _getAssetsByID;
    ordersServiceFactory.getAssetsByProjectID = _getAssetsByProjectID;
    ordersServiceFactory.updateAsset = _updateAsset;
    ordersServiceFactory.deleteAsset = _deleteAsset;


    ordersServiceFactory.getCategory = _getCategory;
    ordersServiceFactory.saveCategory = _saveCategory;
    ordersServiceFactory.getCategoryByID = _getCategoryByID;
    ordersServiceFactory.updateCategory = _updateCategory;
    ordersServiceFactory.deleteCategory = _deleteCategory;


    ordersServiceFactory.getExpense = _getExpense;
    ordersServiceFactory.saveExpense = _saveExpense;
    ordersServiceFactory.getExpenseByID = _getExpenseByID;
    ordersServiceFactory.updateExpense = _updateExpense;
    ordersServiceFactory.deleteExpense = _deleteExpense;

    ordersServiceFactory.getExpenseByProjectID = _getExpenseByProjectID;
    ordersServiceFactory.getExpenseByAssetID = _getExpenseByAssetID;
    ordersServiceFactory.getExpenseBySupplierID = _getExpenseBySupplierID;


    ordersServiceFactory.getIncoming = _getIncoming; 
    ordersServiceFactory.saveIncoming = _saveIncoming;
    ordersServiceFactory.getIncomingByID = _getIncomingByID;
    ordersServiceFactory.getIncomingByProjectID = _getIncomingByProjectID;
    ordersServiceFactory.updateIncoming = _updateIncoming;
    ordersServiceFactory.deleteIncoming = _deleteIncoming;

    ordersServiceFactory.getManufacturer = _getManufacturer;
    ordersServiceFactory.saveManufacturer = _saveManufacturer;
    ordersServiceFactory.getManufacturerByID = _getManufacturerByID;
    ordersServiceFactory.updateManufacturer = _updateManufacturer;
    ordersServiceFactory.deleteManufacturer = _deleteManufacturer;

    ordersServiceFactory.getSupplier = _getSupplier;
    ordersServiceFactory.saveSupplier = _saveSupplier;
    ordersServiceFactory.getSupplierByIDdForEdit = _getSupplierByIDdForEdit;
    ordersServiceFactory.getSupplierByID = _getSupplierByID;
    ordersServiceFactory.updateSupplier = _updateSupplier;
    ordersServiceFactory.deleteSupplier = _deleteSupplier;

    ordersServiceFactory.getCustomer = _getCustomer;
    ordersServiceFactory.saveCustomer = _saveCustomer;

    
    ordersServiceFactory.customMethod = _customMethod;
    ordersServiceFactory.getTransactionByID = _getTransactionByID;

    return ordersServiceFactory;

}]);