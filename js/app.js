'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/visualization', {templateUrl: 'partials/visualization.html', controller: 'VisualCtrl'});
  $routeProvider.when('/main', {templateUrl: 'partials/main.html', controller: 'MainCtrl'});
  $routeProvider.otherwise({redirectTo: '/main'});
}]);
