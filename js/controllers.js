'use strict';

/* Controllers */
var result = []

angular.module('myApp.controllers', []).
  controller('VisualCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
    $http.get('https://api.github.com/repos/' + $rootScope.user +'/'+$rootScope.repository+'/issues?state=closed&client_id=6b6eb2d2f4129ecbb15e&client_secret=903b7b6401bc3081ad6421c230444867f03ed4e1')
        .then(function(res) {
            var data = res.data;
            for (var i in data) {
                if (data[i].closed_at) {
                    var issue = {};
                    issue.labels = data[i].labels;
                    issue.date = data[i].closed_at;
                    issue.comments = data[i].comments;
                    result.push(issue);
                }
            }
            console.log(angular.toJson(result));
            drawVis1();
        });
    
    function drawVis1() {
        var names = ['NoLabel'];
        var data = {'NoLavel':0};
        var min = result[0].date;
        var max = result[0].date;
        var items = []

        for (var i in result){
            var issue = result[i];
            if (issue.date > max){
                max = issue.date;
            }
            if (issue.date < min){
                min = issue.date;
            }
            if (issue.labels.length==0){
                items.push({
                    x: issue.date,
                    y: issue.comments,
                    group: 0
                });
            }
            else{
                var label = issue.labels[0].name;
                if (data[label]==undefined){
                    data[label]=names.length;
                    names.push(label);
                }

                items.push({
                    x: issue.date,
                    y: issue.comments,
                    group: data[label]
                })
            }
        }
        console.log(items)

        var groups = new vis.DataSet();
        console.log(names)
        for (var i in names) {
            console.log(names[i])
            groups.add({
                id: i,
                content: names[i],
                options: {
                    drawPoints: {
                        style: 'square' // square, circle
                    }
                }
            });
        }

        var container = document.getElementById('visualization');
        

        var dataset = new vis.DataSet(items);
        var options = {
            defaultGroup: 'ungrouped',
            legend: true,
              start: min,
              end: max
        };
        var graph2d = new vis.Graph2d(container, dataset, options, groups);

    }

  }])
  .controller('MainCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
    $scope.visualize = function(){
        console.log($scope.user)
        $rootScope.repository = $scope.repository;
        $rootScope.user = $scope.user;
        $location.path("visualization");
    }

  }]);