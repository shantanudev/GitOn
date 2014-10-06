'use strict';

/* Controllers */
var result = []

angular.module('myApp.controllers', []).
  controller('MyCtrl1', ['$scope', '$http', function($scope, $http) {
    $http.get('https://api.github.com/repos/FezVrasta/bootstrap-material-design/issues?state=closed&client_id=6b6eb2d2f4129ecbb15e&client_secret=903b7b6401bc3081ad6421c230444867f03ed4e1')
        .then(function(res) {
            var data = res.data;
            for (var i in data) {
                if (data[i].closed_at) {
                    var issue = {};
                    issue.labels = data[i].labels;
                    issue.data = data[i].closed_at;
                    issue.comments = {};
                    getComment(data, i, issue);
                    result.push(issue);
                }
            }
            console.log(angular.toJson(result));
        });

    function getComment(data, i, issue){
          $http.get(data[i].comments_url+"?client_id=6b6eb2d2f4129ecbb15e&client_secret=903b7b6401bc3081ad6421c230444867f03ed4e1")
         .then(function(res) {
             var comments = res.data;
             for (var j in comments) {
                 var user = comments[j].user.login;
                 if (issue.comments[user]) {
                     issue.comments[user] += 1;
                 } else {
                     issue.comments[user] = 1;
                 }
             }
         })

    }
  }])
  .controller('MyCtrl2', [function() {

  }]);