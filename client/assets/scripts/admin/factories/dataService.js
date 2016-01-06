myApp.service('DataService', ['$http', '$filter', function($http, $filter){

    var formData = {};
    var user = undefined;
    var date = $filter('date')((new Date()), 'yyyy-MM-dd');
    var selectedStudent = {};


    return {
        getData: function () {
            //You could also return specific attribute of the form data instead
            //of the entire data
            console.log('this is form data saved in factory', formData);
            return formData;
        },
        setData: function (newFormData) {
            //You could also set specific attribute of the form data instead
            console.log('setData Called in factory', newFormData);
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
        peopleData: function() {
            //give user info to controller
            return user;
        },
        getDate: function(){
        //give user info to controller
        return date;
        },
        //added the get student for the teacher app just in case user wants to go back to the class list.
        //This way, we can store the list in the formData, and the student info in the selectedStudent without making lots of calls to server.
        setStudent: function(newStudent) {
            selectedStudent = newStudent;
        },
        getStudent: function(){
            return selectedStudent;
        },
        getClasses: function(){
            return $http.get('/teacher').then(function(response){
                var classes = [];
                for (var i=0; i<response.data.length; i++){
                    classes.push((response.data[i].class_date).slice(0, 10));
                }
               return classes;


            });
        }


    };


}]);