myApp.controller('uploadCtrl', ['$scope', '$http', 'Upload', 'DataService', function($scope, $http, Upload, DataService){
    console.log('on admin upload controller--uploadCtrl.js');

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


    $scope.uploadStatus = false;

    $scope.upload = function (file) {
        console.log(file);
        Upload.upload({
            url: '/upload',
            data: {file: file}
        }).then(function (resp) {
           $scope.uploadStatus = response;
        });
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);

    };

}]);