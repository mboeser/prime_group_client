myApp.controller('absentCtrl', ['$scope', '$http', 'DataService', '$mdToast', '$location',
    function($scope, $http, DataService, $mdToast, $location){
    console.log('on admin absent controller--absentCtrl.js');

    $scope.dataService = DataService;
    $scope.user = {};
    $scope.date = $scope.dataService.getDate();

    $scope.user = $scope.dataService.peopleData();
    $scope.homework_sent = false;

    if($scope.dataService.peopleData() === undefined){
        $scope.dataService.retrieveData().then(function(){
            $scope.user = $scope.dataService.peopleData();
            console.log($scope.user);
        });
    }



    var excusedCheckbox = "<md-checkbox ng-model='row.entity.excused' class='md-warn md-hue2' type='checkbox' name='excused' ng-change='grid.appScope.saveRow(row.entity)'></md-checkbox>"; 
    var homeworkCheckbox = "<md-checkbox ng-model='row.entity.homework_sent' class='md-warn md-hue2' type='checkbox' name='homework_sent'  ng-change='grid.appScope.saveRow(row.entity)'></md-checkbox>";
    var expandStudentTemplate = '<div class="ui-grid-cell-contents"  ng-click="grid.appScope.selectStudent(row.entity.id)">{{row.entity.id}}</div>';


    $scope.gridOptions = {
        enableSorting: true,
        rowEditWaitInterval: 500,
        columnDefs: [
            {
                name: 'id', field: 'id', enableCellEdit: false,
                cellTemplate: expandStudentTemplate
            },
            { name:'Teacher', field: 'lastname' , enableCellEdit:true},
            { name:'First Name', field: 'student_firstname' , enableCellEdit:true},
            { name:'Last Name', field: 'student_lastname' , enableCellEdit:true, sort: {direction: 'asc'}},
            { name:'Phone 1', field: 'phone1' , enableCellEdit:true, cellFilter:'tel'},

            { name:'Call Status', field: 'contact_status' , enableCellEdit:true,
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
        ],

        enableGridMenu: true,
        enableSelectAll: true,
        exporterCsvFilename: 'myFile.csv',
        exporterPdfDefaultStyle: {fontSize: 9},
        exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
        exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
        exporterPdfHeader: {text: "Breakthrough Twin Cities", style: 'headerStyle'},
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

    console.log($scope.dataService.getData());
    $scope.gridOptions.data = $scope.dataService.getData();


    $scope.saveRow = function( rowEntity ) {
        console.log("in save row");
        console.log("rowEntity", rowEntity);
        var promise = $http.put('/updateAbsent', rowEntity).then(function(response){
            $scope.editUserToast();
            console.log(response);
            console.log(promise);
        });
        $scope.gridApi.rowEdit.setSavePromise( rowEntity, promise);
    };

    $scope.gridOptions.onRegisterApi = function(gridApi){
        //set gridApi on scope
        $scope.gridApi = gridApi;
        gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    };


    $scope.selectStudent = function(studentID){
        $http.get('/student', {params: {'student': studentID}}).then(function(response){
            $scope.dataService.setStudent(response.data[0]);
            $scope.dataService.getStudent();
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