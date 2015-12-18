myApp.controller('preworkCtrl', ['$scope', '$http', '$location','DataService', function ($scope, $http, $location, DataService) {
    console.log('on admin prework controller--preworkCtrl.js');

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

    var notCalledTemplate = '<div ng-if="row.entity.contact_status">{{row.entity.contact_status}}</div>' +
        '<div ng-if="!row.entity.contact_status">Not Yet Called</div>';


    $scope.gridOptions = {
        enableSorting: true,

        columnDefs: [
            { name:'id', field: 'id', enableCellEdit: false },
            { name:'Teacher', field: 'lastname' , enableCellEdit:true},
            { name:'First Name', field: 'student_firstname' , enableCellEdit:true},
            { name:'Last Name', field: 'student_lastname' , enableCellEdit:true},
            { name:'Phone 1', field: 'phone1' , enableCellEdit:true},
            { name:'Call Status', field: 'contact_status' ,   cellTemplate: notCalledTemplate , enableCellEdit:true,
                editableCellTemplate: 'ui-grid/dropdownEditor',
                editDropdownValueLabel: 'contact_status',
                editDropdownOptionsArray: [
                    { id: 'Not Yet Called', contact_status: 'Not Yet Called' },
                    { id: 'Reached', contact_status: 'Reached' },
                    { id: 'Left Message', contact_status: 'Left Message' }
                ]},
            { name:'Administration Notes', field: 'admin_notes' , enableCellEdit:true}
        ]
    };

    $scope.gridOptions.data = $scope.dataService.getData();


    $scope.saveRow = function( rowEntity ) {
        var promise = $http.put('/adminPrework', rowEntity).then(function(response){
           console.log(response);
        });
        $scope.gridApi.rowEdit.setSavePromise( rowEntity, promise);
    };

    $scope.gridOptions.onRegisterApi = function(gridApi){
        //set gridApi on scope
        $scope.gridApi = gridApi;
        gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    };


    $scope.openStudent = function(student){
        $http.get('/student', {params: {who: student}}).then(function(response){
            console.log(response.data);
            $scope.dataService.setData(response.data);

        });
    }

}]);