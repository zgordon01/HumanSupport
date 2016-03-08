//landingapp module with routes
angular.module('landingapp', ['ngRoute']).config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/admin', {
		templateUrl : 'admin.html',
		controller : 'admincontroller'
	}).when('/tech',{
		templateUrl : 'tech.html',
		controller : 'techcontroller'
	}).when('/users',{
		templateUrl : 'users.html',
		controller : 'userscontroller'
	}).when('/invalid',{
		templateUrl : 'failure.html',
        controller : 'failurecontroller'
	}).otherwise({
		templateUrl : 'failure.html',
		redirectTo : '/invalid',
        controller : 'failurecontroller'
	})
}]);


/*angular.module('login').factory('queryservice', function($http){
	return{
		post: function(route, params){
		var returndata;
		var request = $http({
		  method : 'POST',
		  url    : 'http://198.211.99.235:8080/' + route,
			//give params with this syntax {username : $scope.username, password : $scope.pass}
		  data : $.param(params),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		});
    request.success(function (data){
        returndata = data;
    });
alert("about to return " + returndata);
		return returndata;
		}
	}
	
});*/
