myApp.controller('preworkCtrl', ['$scope', '$http', '$location', 'DataService', '$mdToast', '$filter', function ($scope, $http, $location, DataService, $mdToast, $filter) {
    console.log('on admin prework controller--preworkCtrl.js');

    //FACTORY
    $scope.dataService = DataService;
    $scope.user = {};
    $scope.date = $scope.dataService.getDate();


    $scope.user = $scope.dataService.peopleData();
    console.log("$scope.dataService.peopleData", $scope.dataService.peopleData());

    if ($scope.dataService.peopleData() === undefined) {
        $scope.dataService.retrieveData().then(function () {
            $scope.user = $scope.dataService.peopleData();
        });
    }

    //HTML TEMPLATES FOR GRID
    var expandStudentTemplate = '<div class="ui-grid-cell-contents"  ng-click="grid.appScope.selectStudent(row.entity.id)">{{row.entity.id}}</div>';


    $scope.gridOptions = {
        enableSorting: true,
        rowEditWaitInterval: 500,

        columnDefs: [
            {
                name: 'id', field: 'id', enableCellEdit: false,
                cellTemplate: expandStudentTemplate
            },
            {name: 'Teacher', field: 'lastname', cellClass: 'cell-default', enableCellEdit: false},
            {name: 'First Name', field: 'student_firstname', cellClass: 'cell-default', enableCellEdit: false},
            {name: 'Last Name', field: 'student_lastname', cellClass: 'cell-default', enableCellEdit: false, sort: {direction: 'asc'}},
            {name: 'Phone 1', field: 'phone1', enableCellEdit: true, cellFilter:'tel'},
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

    $scope.saveRow = function (rowEntity) {
        var promise = $http.put('/adminPrework', rowEntity).then(function (response) {
            $scope.editUserToast();
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

    myApp.filter('tel', function(){
        return function(tel){
            if (!tel){ return '';}
            var value=tel.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return tel;
            }

            var city, number;

            switch(value.length){
                case 12:
                    city = value.slice(0,3);
                    number = value.slice(4);
                    break;

                case 10:
                    city = value.slice(0,3);
                    number = value.slice(3);
                    break;

                case 13:
                    console.log("at 13");
                    return value;

                default:
                    city = value.slice(0,3);
                    number = value.slice(4);
                    console.log(city);
                    console.log(number);
                    return value;
            }

            number = number.slice(0,3) + '-' + number.slice(3);

            return ("(" + city + ") " + number).trim();
        };
    });
