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
                    issue.comments = data[i].comments;
                    result.push(issue);
                }
            }
            console.log(angular.toJson(result));
        });
    drawVis1();
    function drawVis1() {
        // var name = ['NoLabel'];
        // var data = {'NoLavel':0};
        // for (var i in result){
        //     var issue = result[i];
        // }
        var names = ['SquareShaded', 'Bar', 'Blank', 'CircleShaded'];
        var groups = new vis.DataSet();
        groups.add({
            id: 0,
            content: names[0],
            options: {
                drawPoints: {
                    style: 'square' // square, circle
                },
                shaded: {
                    orientation: 'bottom' // top, bottom
                }
            }
        });

        groups.add({
            id: 1,
            content: names[1],
            options: {
                style: 'bar'
            }
        });

        groups.add({
            id: 2,
            content: names[2],
            options: {
                drawPoints: false
            }
        });

        groups.add({
            id: 3,
            content: names[3],
            options: {
                drawPoints: {
                    style: 'circle' // square, circle
                },
                shaded: {
                    orientation: 'top' // top, bottom
                }
            }
        });

        var container = document.getElementById('visualization');
        var items = [{
            x: '2014-06-13',
            y: 60
        }, {
            x: '2014-06-14',
            y: 40
        }, {
            x: '2014-06-15',
            y: 55
        }, {
            x: '2014-06-16',
            y: 40
        }, {
            x: '2014-06-17',
            y: 50
        }, {
            x: '2014-06-13',
            y: 30,
            group: 0
        }, {
            x: '2014-06-14',
            y: 10,
            group: 0
        }, {
            x: '2014-06-15',
            y: 15,
            group: 1
        }, {
            x: '2014-06-16',
            y: 30,
            group: 1
        }, {
            x: '2014-06-17',
            y: 10,
            group: 1
        }, {
            x: '2014-06-18',
            y: 15,
            group: 1
        }, {
            x: '2014-06-19',
            y: 52,
            group: 1
        }, {
            x: '2014-06-20',
            y: 10,
            group: 1
        }, {
            x: '2014-06-21',
            y: 20,
            group: 2
        }, {
            x: '2014-06-22',
            y: 60,
            group: 2
        }, {
            x: '2014-06-23',
            y: 10,
            group: 2
        }, {
            x: '2014-06-24',
            y: 25,
            group: 2
        }, {
            x: '2014-06-25',
            y: 30,
            group: 2
        }, {
            x: '2014-06-26',
            y: 20,
            group: 3
        }, {
            x: '2014-06-27',
            y: 60,
            group: 3
        }, {
            x: '2014-06-28',
            y: 10,
            group: 3
        }, {
            x: '2014-06-29',
            y: 25,
            group: 3
        }, {
            x: '2014-06-30',
            y: 30,
            group: 3
        }];

        var dataset = new vis.DataSet(items);
        var options = {
            defaultGroup: 'ungrouped',
            legend: true,
            start: '2014-06-10',
            end: '2014-07-04'
        };
        var graph2d = new vis.Graph2d(container, dataset, options, groups);

    }

  }])
  .controller('MyCtrl2', [function() {

  }]);