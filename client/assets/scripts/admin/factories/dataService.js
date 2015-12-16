myApp.service('DataService', [function(){

    var formData = {};
    var user = {};

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
        retriveData: function(){
            //Call server to access req.user after login for persistent user information.
            return $http.get('/user').then(function(response){
                user = response.data;
                console.log("Async Data Response: ", user);
                return response.data;
            });
        },
        peopleData: function(){
            //give user info to controller
            return user;
        }



    };


}]);