myApp.service('DataService', ['$http', function($http){

    var formData = {};
    var user = undefined;

    return {
        getData: function () {
            //You could also return specific attribute of the form data instead
            //of the entire data
            return formData;
        },
        setData: function (newFormData) {
            //You could also set specific attribute of the form data instead
            formData = newFormData
        },
        resetData: function () {
            //To be called when the data stored needs to be discarded
            formData = {};
        },
        retrieveData: function(){
            //Call server to access req.user after login for persistent user information.
            return $http.get('/user').then(function(response){
                user = response.data;
                return response.data;
            });
        },
        peopleData: function(){
            //give user info to controller
            return user;
        }



    };


}]);