myApp.controller('dashTCtrl', ['$scope', '$http', 'DataService', function ($scope, $http, DataService) {
    console.log('on teacher dash controller--dashTCtrl.js');

    $scope.dataService = DataService;
    $scope.user = {};
    $scope.date = $scope.dataService.getDate();
    $scope.classes = [];

    $scope.user = $scope.dataService.peopleData();

    if($scope.dataService.peopleData() === undefined){
        $scope.dataService.retrieveData().then(function(){
            $scope.user = $scope.dataService.peopleData();
            console.log($scope.user);
        });
    }

//Get the initial classes listed on the teacher dashboard.
    $scope.getClasses = function(){
        $http.get('/teacher').then(function(response){
            console.log("Get classes function");
            console.log("response from server", response.data);
            for (var i=0; i<response.data.length; i++){
                $scope.classes.push((response.data[i].class_date).slice(0, 10));
            };
            console.log($scope.classes);
        });
    };

//Teacher selects a class. DataService form data reset to match incoming students for next page.
    $scope.selectClass = function(date){
        date='2015-01-09';//hard coded for testing.
        $http.get('/teacher_prework', {params: {'date': date}}).then(function(response){
            $scope.dataService.setData(response.data);
            console.log("This is getData", $scope.dataService.getData());
        });
    };


    $scope.getAttendance = function(){
        $http.get('/attendance', {params: {date: $scope.date, who: $scope.user}}).then(function(response){
            console.log(response);
        })
    };


    $scope.getClasses();
    $scope.selectClass();//only present for testing at the moment.

}]);