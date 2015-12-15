myApp.controller('uploadCtrl', ['$scope', '$http', 'Upload', function($scope, $http, Upload){
    console.log('on admin upload controller--uploadCtrl.js')

    $scope.upload = function (file) {
        FileUploader.upload({
            url: '/upload',
            data: {file: file}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };

}]);