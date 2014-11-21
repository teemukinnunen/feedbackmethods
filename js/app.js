var app = angular.module('feedbackApp', []);

app.controller("MethodsCtrl", function($scope, $http) {
    this.methods = [];
  $http.get('data/feedbackmethods.json').
    success(function(data, status, headers, config) {
      $scope.methods = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
})

app.directive('methodDescription', function() {
    return {
        templateUrl : 'method-description.html'
    };
});

app.controller("TagFilterCtrl", function($scope, $http) {

    $scope.tagsEnabled = [];

    this.enableFilter = function(tagName) {
        $scope.tagsEnabled.push(tagName);
        for(i=0; i < $scope.tags.length; i++)
        {
                if($scope.tags[i].Name == tagName)
                {
                    if( $scope.tags[i].enabled == 0)
                    {
                        $scope.tags[i].enabled = 1;
                    }
                    else
                    {
                        $scope.tags[i].enabled = 0;
                    }
                    
                }
        }
        
    }

    $http.get('data/tags.json').
        success(function(data, status, header, config) {
            $scope.tags = data;
            for(i=0; i < $scope.tags.length; i++)
            {
                $scope.tags[i].enabled = 0;
            }
    }).
        error(function(data, status, header, config) {
            // log error
    });

})
