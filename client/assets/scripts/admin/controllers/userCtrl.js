myApp.controller('userCtrl', ['$scope', '$http', '$location', 'DataService', function ($scope, $http, $location, DataService) {
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
        enableSorting: true,
        enableColumnResizing: true,

        dataUpdated: function () {
            console.log('edited!')
        },
        columnDefs: [

            {name: 'First Name', field: 'firstname', width: '20%', enableCellEdit: true},
            {name: 'Last Name', field: 'lastname', width: '20%', enableCellEdit: true},

            {
                name: 'role',
                field: 'role',
                minWidth: 80,
                width: 90,
                enableColumnResizing: false,
                editableCellTemplate: 'ui-grid/dropdownEditor',
                editDropdownValueLabel: 'role',

                editDropdownOptionsArray: [
                    {id: 'admin', role: 'Admin'},
                    {id: 'teacher', role: 'Teacher'}
                ]
            },

            { name: 'Email', field: 'email', minWidth: 200, maxWidth: 350, enableCellEdit: true},
            {  name: 'Delete User', field: 'DeleteUser',
                cellTemplate:'<button style="margin-left: 40%; " class="delete-button" ng-click="grid.appScope.deleteUser(person)">Delete</button>' }
        ]
    };


    $scope.submitForm = function () {
        $http.post('/roles', $scope.newUser).then(function (response) {
            console.log('post response :', response);
            $scope.getUserList();
            $scope.newUser = {};
        });
    };

    $scope.getUserList = function () {
        $http.get('/roles').then(function (response) {

            //$scope.gridOptions = {  };

            //$scope.userList = response.data;
            $scope.gridOptions.data = response.data;

            console.log('this is userList :', $scope.userList);


        })
    };

    $scope.updateUser = function (person) {
        $http.put('/roles', person).then(function (response) {
            console.log('put response :', response);
            $scope.getUserList();
        });
    };

    $scope.deleteUser = function (person) {
        $http.delete('/roles', {params: {deleteMe: person}}).then(function (response) {
            console.log('delete response :', response);
            $scope.getUserList();
        });
    };
    $scope.getUserList();
}]);