'use strict';

/* Controllers */
var result = []

angular.module('myApp.controllers', []).
  controller('VisualCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
    $http.get('https://api.github.com/repos/' + $rootScope.user +'/'+$rootScope.repository+'/issues?state=closed')
        .then(function(res) {
            var data = res.data;
            for (var i in data) {
                if (data[i].closed_at) {
                    var issue = {};
                    issue.title = data[i].title
                    issue.labels = data[i].labels;
                    issue.date = data[i].created_at;
                    issue.date2 = data[i].closed_at;
                    issue.comments = data[i].comments;
                    result.push(issue);
                }
            }
            drawVis1();
            drawVis2();
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

        var groups = new vis.DataSet();
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

    function drawVis2() {
        var labels = [{
            id: 0, content: 'NoLabel', value: 1
        }];
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
                    id: items.length,
                    group: 0,
                    content: issue.title,
                    start: new Date(issue.date),
                    end: new Date(issue.date2)
                });
            }
            else{
                var label = issue.labels[0].name;
                if (data[label]==undefined){
                    data[label]=labels.length;
                    labels.push({
                        id: labels.length,
                        content: label,
                        value: labels.length+1
                    });
                }

                items.push({
                    id: items.length,
                    group: data[label],
                    content: issue.title,
                    start: new Date(issue.date),
                    end: new Date(issue.date2)
                })
            }
        }

        var groups = new vis.DataSet(labels);

        // create a dataset with items
        // note that months are zero-based in the JavaScript Date object, so month 3 is April
        var dataset = new vis.DataSet(items);

        // create visualization
        var container = document.getElementById('visualization2');
        var options = {
            // option groupOrder can be a property name or a sort function
            // the sort function must compare two groups and return a value
            //     > 0 when a > b
            //     < 0 when a < b
            //       0 when a == b
            groupOrder: function(a, b) {
                return a.value - b.value;
            },
            start: min,
            end: max
        };

        var timeline = new vis.Timeline(container);
        timeline.setOptions(options);
        timeline.setGroups(groups);
        timeline.setItems(dataset);
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