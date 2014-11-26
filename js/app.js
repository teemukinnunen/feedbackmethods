var app = angular.module('feedbackApp', []);

app.controller("MethodsCtrl", function($scope, $http) {
    this.methods = [];
  $http.get('data/feedbackmethods.json').
    success(function(data, status, headers, config) {
      $scope.methods = data;
      for(i=0; i<$scope.methods.length; i++)
      {
        $scope.methods[i].hidden = 0;
      }
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
                        /* Switch off all the methods not having tags[i] */
                        for(j=0; j < $scope.methods.length; j++)
                        {
                            m = $scope.methods[j];
                            if(m[tagName] == 0)
                            {
                                $scope.methods[j].hidden = 1;
                            }
                        }
                    }
                    else
                    {
                        /* Set tag to enabled (changes colour) */
                        $scope.tags[i].enabled = 0;
                        
                        /* TODO: Enable disabled methods */
                        for(j=0; j < $scope.methods.length; j++)
                        {
                            /* Check all the hidden methods that if can unhide them */
                            if($scope.methods[j].hidden)
                            {
                                /* Unhide the method and then check if it needs to be hidden */
                                $scope.methods[j].hidden = 0;
                                /* Check all the enabled tags */
                                for(k=0; k<$scope.tags.length; k++)
                                {
                                    if($scope.tags.enabled)
                                    {
                                        if($scope.methods[j][$scope.tags[k]] == 0)
                                        {
                                            $scope.methods[j].hidden = 1;
                                        }
                                    }
                                }
                            }
                        }
                        
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
