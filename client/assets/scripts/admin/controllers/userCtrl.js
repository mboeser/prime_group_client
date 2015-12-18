myApp.controller('userCtrl', ['$scope', '$http', '$location','DataService', function ($scope, $http, $location, DataService) {
    console.log('on admin user controller--userCtrl.js');

    $scope.dataService = DataService;
    $scope.user = {};
    $scope.date = $scope.dataService.getDate();

    $scope.user = $scope.dataService.peopleData();

    if($scope.dataService.peopleData() === undefined){
        $scope.dataService.retrieveData().then(function(){
            $scope.user = $scope.dataService.peopleData();
            console.log($scope.user);
        });
    }

    $scope.userList = [];
    $scope.newUser = {};

    $scope.gridOptions = {
        enableSorting: true,

        dataUpdated: function(){
            console.log('edited!')
        },
        columnDefs: [
            { name:'id', field: 'id', enableCellEdit: false},
            { name:'role', field: 'role' , editableCellTemplate: 'ui-grid/dropdownEditor', editDropdownValueLabel: 'role',

                editDropdownOptionsArray: [
                { id: 'admin', role: 'Admin' },
                { id: 'teacher', role: 'Teacher' }
            ]},
            { name:'First Name', field: 'firstname' , enableCellEdit: true},
            { name:'Last Name', field: 'lastname' , enableCellEdit: true},
            { name:'Email', field: 'email' , enableCellEdit: true}
        ]
    };


    $scope.submitForm = function () {
        $http.post('/roles', $scope.newUser).then(function (response) {
            console.log('post response :', response);
            $scope.getUserList();
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