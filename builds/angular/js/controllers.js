var myControllers = angular.module('myControllers', []);

myControllers.controller('SearchController', function SearchController
	($scope, $http) {
		// getting access to our json file
	$http.get('js/data.json')
	.then(function(response) {
		$scope.artists = response.data;
		$scope.artistOrder = 'name';
	});

	//previous way of inputing json data into an array
	// $scope.artists = [

	// ]
});
myControllers.controller('DetailsController', function MyController
	($scope, $http, $routeParams) {
	$http.get('js/data.json')
	.then(function(response) {
		$scope.artists = response.data;
		$scope.whichItem = $routeParams.itemId;
		// we use this to increment or decrement our current item Id when the corresponding arrows are pressed
		if ($routeParams.itemId > 0) {
			$scope.prevItem = Number($routeParams.itemId) - 1;
		}
		else{
			$scope.prevItem = $scope.artists.length - 1;
		}
		if ($routeParams.itemId < $scope.artists.length - 1) {
			$scope.nextItem = Number($routeParams.itemId) + 1;
		}
		else{
			$scope.nextItem = 0;
		}
	});
});