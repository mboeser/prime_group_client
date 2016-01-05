/**
 * Created by danesmith on 1/5/16.
 */
myApp.controller('navCtrl', ['$scope', '$http', 'DataService', function($scope, $http, DataService){

    $scope.dataService = DataService;
    $scope.date = $scope.dataService.getDate();
    $scope.classToday = false;

    $scope.dataService.getClasses().then(function(classes){
        console.log('this is classes ', classes);
        for (var j = 0; j < classes.length; j++) {
            console.log('for loop', j);
            if ($scope.date == classes[j]) {
                return $scope.classToday = true;
            }
        }
    });






}]);