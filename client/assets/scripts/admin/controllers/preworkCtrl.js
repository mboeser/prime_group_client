myApp.controller('preworkCtrl', ['$scope', '$http', '$location', 'DataService', '$mdToast', function ($scope, $http, $location, DataService, $mdToast) {
    console.log('on admin prework controller--preworkCtrl.js');

    $scope.dataService = DataService;
    $scope.user = {};
    $scope.date = $scope.dataService.getDate();
    console.log("This is the date you are asking for", $scope.date);

    $scope.user = $scope.dataService.peopleData();
    console.log("$scope.dataService.peopleData", $scope.dataService.peopleData());

    if ($scope.dataService.peopleData() === undefined) {
        $scope.dataService.retrieveData().then(function () {
            $scope.user = $scope.dataService.peopleData();
            console.log("This is $scope.user", $scope.user);
        });
    }

    var expandStudentTemplate = '<div class="ui-grid-cell-contents"  ng-click="grid.appScope.selectStudent(row.entity.id)">{{row.entity.id}}</div>';


    $scope.gridOptions = {
        enableSorting: true,
        rowEditWaitInterval: 500,

        columnDefs: [
            {
                name: 'id', field: 'id', enableCellEdit: false,
                cellTemplate: expandStudentTemplate
            },
            {name: 'Teacher', field: 'lastname', enableCellEdit: false},
            {name: 'First Name', field: 'student_firstname', enableCellEdit: false},
            {name: 'Last Name', field: 'student_lastname', enableCellEdit: false, sort: {direction: 'asc'}},
            {name: 'Phone 1', field: 'phone1', enableCellEdit: true},
            {
                name: 'Call Status', field: 'contact_status', enableCellEdit: true,

                editableCellTemplate: 'ui-grid/dropdownEditor',
                editDropdownValueLabel: 'contact_status',
                editDropdownOptionsArray: [
                    {id: 'Not Yet Called', contact_status: 'Not Yet Called'},
                    {id: 'Reached', contact_status: 'Reached'},
                    {id: 'Left Message', contact_status: 'Left Message'}
                ]
            },
            {name: 'Administration Notes', field: 'admin_notes', enableCellEdit: true}
        ]
    };

    $scope.gridOptions.data = $scope.dataService.getData();
    console.log();


    $scope.saveRow = function (rowEntity) {
        var promise = $http.put('/adminPrework', rowEntity).then(function (response) {
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


    $scope.selectStudent = function (studentID) {
        $http.get('/student', {params: {'student': studentID}}).then(function (response) {
            $scope.dataService.setStudent(response.data[0]);
            $scope.dataService.getStudent();
            console.log("This is response.data", response.data[0]);
            console.log("This is the student in the factory", $scope.dataService.getStudent());
            $scope.student = $scope.dataService.getStudent();
            if ($scope.student.grade < 9) {
                $location.path('/middleschool');
            } else {
                $location.path('/highschool');
            }
        });
    };
    $scope.editUserToast = function () {
        $mdToast.show($mdToast.simple().content('Student Edited!'));
    };
}]);