var myApp = angular.module('myApp', [
	'ngRoute', 
	'myControllers'
]);

myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	// .when allows us to recognize a route basically different pages
		.when('/', {
			templateUrl: 'js/partials/search.html',
			controller: 'SearchController'
		})
		.when('/details/:itemId', {
			templateUrl: 'js/partials/details.html',
			controller: 'DetailsController'
		});
}]);

