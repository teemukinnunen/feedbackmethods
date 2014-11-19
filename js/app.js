var app = angular.module('feedbackApp', []);

app.controller('MethodsController', function($http) {
/* List all methods here (if shiny json does not work :) */
this.methods =
/*
[
    {
        "name" : "End of the course feedback",
        "description" : "Insert a short description",
        "size" : "medium or large"
    },
    {
        "name" : "Student background questionary",
        "description" : "Insert a short description",
        "size" : "medium or large"
    },
    {
        "name" : "Student messanger",
        "description" : "Insert a short description",
        "size" : "any"
    },
    {
        "name" : "Post-it notes",
        "description" : "Insert a short description",
        "size" : "small"
    }
]; */
    /* works only in internet? */
    $http.get('http://teemukinnunen.github.io/feedbackmethods/feedbackmethods.json').success(function(data) {
      this.methods = data;
    });
    
	
});

