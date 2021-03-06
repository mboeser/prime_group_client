myApp.controller('classCtrl', ['$scope', '$http', 'DataService', '$location', '$mdToast', function ($scope, $http, DataService, $location, $mdToast) {
    console.log('on teacher class controller--classCtrl.js');

    $scope.dataService = DataService;
    $scope.user = {};
    $scope.date = $scope.dataService.getDate();
    $scope.students = $scope.dataService.getData();
    $scope.classdate = ($scope.students[0].class_date).slice(0, 10);
    $scope.student;

    $scope.user = $scope.dataService.peopleData();

    if($scope.dataService.peopleData() === undefined){
        $scope.dataService.retrieveData().then(function(){
            $scope.user = $scope.dataService.peopleData();
        });
    }


    var notCalledTemplate = '<div ng-if="row.entity.contact_status">{{row.entity.contact_status}}</div>' +
        '<div ng-if="!row.entity.contact_status">Not Yet Called</div>';

    var expandStudentTemplate = '<div class="ui-grid-cell-contents" ng-click="grid.appScope.selectStudent(row.entity.id)">{{row.entity.id}}</div>';


    $scope.gridOptions = {
        enableSorting: true,

        rowEditWaitInterval: 500,


        columnDefs: [
            { name:'id', field: 'id', enableCellEdit: false,
                cellTemplate: expandStudentTemplate},
            { name:'First Name', field: 'student_firstname' , enableCellEdit:false, cellClass: 'cell-default'},
            { name:'Last Name', field: 'student_lastname' , enableCellEdit:false, cellClass: 'cell-default', sort: {direction: 'asc'}},
            { name:'Phone 1', field: 'phone1' , enableCellEdit:true, cellFilter:'tel'},
            { name:'Call Status', field: 'contact_status' ,   cellTemplate: notCalledTemplate , enableCellEdit:true,
                editableCellTemplate: 'ui-grid/dropdownEditor',
                editDropdownValueLabel: 'contact_status',
                editDropdownOptionsArray: [
                    { id: 'Not Yet Called', contact_status: 'Not Yet Called' },
                    { id: 'Reached', contact_status: 'Reached' },
                    { id: 'Left Message', contact_status: 'Left Message' }
                ]},
            { name:'Attendance Notes', field: 'attendance_notes' , enableCellEdit:true}
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
    };

    $scope.gridOptions.data = $scope.dataService.getData();


    $scope.saveRow = function( rowEntity ) {
        var promise = $http.put('/adminPrework', rowEntity).then(function(response){
            $scope.editUserToast();
        });
        $scope.gridApi.rowEdit.setSavePromise( rowEntity, promise);
    };

    $scope.gridOptions.onRegisterApi = function(gridApi){
        //set gridApi on scope
        $scope.gridApi = gridApi;
        gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    };


    //This will retrieve the student information of the student the user clicked on.
    $scope.selectStudent = function(studentID){
        $http.get('/student', {params: {'student': studentID}}).then(function(response){
            $scope.dataService.setStudent(response.data[0]);
            $scope.dataService.getStudent();
            $scope.student=$scope.dataService.getStudent();
            if($scope.student.grade < 9){
                $location.path('/middleschool');
            }else {
                $location.path('/highschool');
            }
        });
    };
    $scope.editUserToast = function () {
        $mdToast.show($mdToast.simple().content('Student Edited!'));
    };


}]);