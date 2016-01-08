myApp.controller('userCtrl', ['$scope', '$http', '$location', 'DataService', '$mdToast', function ($scope, $http, $location, DataService, $mdToast) {
    console.log('on admin user controller--userCtrl.js');

    $scope.dataService = DataService;
    $scope.user = {};
    $scope.date = $scope.dataService.getDate();

    $scope.user = $scope.dataService.peopleData();

    if ($scope.dataService.peopleData() === undefined) {
        $scope.dataService.retrieveData().then(function () {
            $scope.user = $scope.dataService.peopleData();
            console.log($scope.user);
        });
    }

    $scope.userList = [];
    $scope.newUser = {};

    $scope.gridOptions = {

        rowEditWaitInterval: 500,

        columnDefs: [

            {
                name: 'First Name',
                field: 'firstname',
                width: '13%',
                enableSorting: true,
                enableColumnResizing: true,
                enableCellEdit: true
            },
            {
                name: 'Last Name',
                field: 'lastname',
                width: '13%',
                enableCellEdit: true
            },

            {
                name: 'role',
                field: 'role',
                minWidth: 60,
                width: 60,
                enableColumnResizing: false,
                editableCellTemplate: 'ui-grid/dropdownEditor',
                editDropdownValueLabel: 'role',

                editDropdownOptionsArray: [
                    {id: 'admin', role: 'Admin'},
                    {id: 'teacher', role: 'Teacher'}
                ]
            },

            {   name: 'Email',
                field: 'email',
                width: '37%',
                enableCellEdit: true
            },
            {
                name: ' ',
                field: 'id',
                enableSorting: false,
                enableColumnMenu: false,
                enableHiding: false,
                enableColumnResizing: false,
                cellTemplate: '<button style="margin-left: 20%; "class="delete-button" ng-click="grid.appScope.deleteUser(row.entity.email)">Delete</button>'
            }
        ],
        enableGridMenu: true,
        enableSelectAll: true,
        exporterCsvFilename: 'myFile.csv',
        exporterPdfDefaultStyle: {fontSize: 9},
        exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
        exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
        exporterPdfHeader: {text: "My Header", style: 'headerStyle'},
        exporterPdfFooter: function (currentPage, pageCount) {
            return {text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle'};
        },
        exporterPdfCustomFormatter: function (docDefinition) {
            docDefinition.styles.headerStyle = {fontSize: 22, bold: true};
            docDefinition.styles.footerStyle = {fontSize: 10, bold: true};
            return docDefinition;
        },
        exporterPdfOrientation: 'portrait',
        exporterPdfPageSize: 'LETTER',
        exporterPdfMaxGridWidth: 500,
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        }
    };
    $scope.saveRow = function (rowEntity) {
        var promise = $http.put('/roles', rowEntity).then(function (response) {
            $scope.editUserToast();
            console.log(response);
        });
        $scope.gridApi.rowEdit.setSavePromise(rowEntity, promise);
    };

    $scope.gridOptions.onRegisterApi = function (gridApi) {
        //set gridApi on scope
        $scope.gridApi = gridApi;
        gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    };


    $scope.submitForm = function () {
        $http.post('/roles', $scope.newUser).then(function (response) {
            console.log('post response :', response);
            $scope.getUserList();
            $scope.newUser = {};
            $scope.addUserForm.$setPristine();
            $scope.addUserForm.$setUntouched();
            $scope.openToast();
        });
    };


    $scope.getUserList = function () {
        $http.get('/roles').then(function (response) {
            $scope.gridOptions.data = response.data;

            console.log('this is userList :', $scope.userList);


        })
    };

    $scope.updateUser = function (person) {
        $http.put('/roles', person).then(function (response) {
            console.log('put response :', response);
            $scope.editUserToast();
            $scope.getUserList();
        });
    };

    $scope.deleteUser = function (person) {
        console.log(person);
        $http.delete('/roles', {params: {deleteMe: person}}).then(function (response) {
            console.log('delete response :', response);
            $scope.deleteUserToast();
            $scope.getUserList();
        });
    };

    $scope.openToast = function () {
        $mdToast.show($mdToast.simple().content('User Added!'));
    };

    $scope.deleteUserToast = function () {
        $mdToast.show($mdToast.simple().content('User Deleted!'));
    };

    $scope.editUserToast = function () {
        $mdToast.show($mdToast.simple().content('User Edited!'));
    };

    $scope.getUserList();
}]);