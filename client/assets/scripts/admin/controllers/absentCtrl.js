myApp.controller('absentCtrl', ['$scope', '$http', 'DataService', function($scope, $http, DataService){
    console.log('on admin absent controller--absentCtrl.js');

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

    var excusedCheckbox = "<md-checkbox ng-model='excused.yes' ng-true-value='1' ng-false-value='0' class='md-warn md-hue2' type='checkbox' name='excused' >Yes</md-checkbox>"; 
    var homeworkCheckbox = "<md-checkbox  ng-model='homework_sent.yes' ng-true-value='1' ng-false-value='0' class='md-warn md-hue2' type='checkbox' name='homework_sent' >Yes</md-checkbox>";

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
            { name:'Homework Sent', field: 'homework_sent' , cellTemplate: homeworkCheckbox, enableCellEdit:true},
            { name:'Excused', field: 'excused' , cellTemplate: excusedCheckbox, enableCellEdit:true},
            { name:'Attendance Notes', field: 'attendance_notes' , enableCellEdit:true}
        ]
    };
    console.log($scope.dataService.getData());
    $scope.gridOptions.data = $scope.dataService.getData();


    $scope.saveRow = function( rowEntity ) {
        var promise = $http.put('/updateAbsent', rowEntity).then(function(response){
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