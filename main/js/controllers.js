//landingapp module with routes
angular.module('landingapp', ['ngRoute']).config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/admin', {
		templateUrl: 'admin.html'
	}).when('/tech',{
		templateUrl : 'tech.html'
	}).when('/users',{
		templateUrl : 'users.html'
	})
}]).controller('navbar', function($scope, $http, $timeout, $location, $interval) {
	//begins the timer for session timeouts. This entire block of code fires after X length of time
	$scope.sess_timer = function(){$timeout(function(){
		//toggles the modal to on once the time has passesd
		$('#timeoutmodal').modal('toggle');
		
		//this fires after 30 seconds and invokes logout()
		$timeout(function (){
			$scope.logout();
    }, 30000);
		
		//declares the modal display counter to start at 30
		$scope.count=30;
		//counts down for display on the modal
		$scope.timer = $interval(function (){
			$scope.count = $scope.count-1;
  		}, 1000);
		
	}, 3600000);};
	
	//logout function invoked when navbar logout button is clicked
	$scope.logout = function(){
		sessionStorage.usrid = "";
		sessionStorage.usrtype = "";
		window.location = "index.html";
	};
	//invoked when the modal's "I'm Still Here!" button is clicked
	$scope.stillHere = function(){
		//toggles the modal to off once the button is clicked
		$('#myModal').modal('toggle');
		//cancels the modal's countdown interval
		$interval.cancel($scope.timer);
	}
	//invoked when the page is initialized
	$scope.init = function(){
		//must have more security than this. protecting this page is a priority
			if(sessionStorage.usrtype==="1"){
				$location.url("admin");
			}
			else if(sessionStorage.usrtype==="2"){
				$location.url("tech");
			}
			else if(sessionStorage.usrtype==="3"){
				$location.url("users");
			}
			else{
				window.location = "index.html";
			}
		//begin the session timer
		$scope.sess_timer();
	};
	$scope.init();
});


//login page module
angular.module('login', []).controller('logincontroller', function($scope, $http) {
	$scope.valid = true;
    $scope.loading=false;
    $scope.username="";
	$scope.pass="";
	//auth function invoked when button clicked
	$scope.auth = function(){
		$scope.loading=true;
		var request = $http({
		  method : 'POST',
		  url    : 'http://198.211.99.235:8080/v1/login',
		  data : $.param({username : $scope.username, password : $scope.pass}),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		});

    request.success(function (data){
		$scope.loading=false;
      	$scope.contents = data;
		//if the credentials are valid, store the user's id and user's type in session storage
		if(data.valid == "yes"){
			sessionStorage.usrid = data.usrid;
			sessionStorage.usrtype = data.usrtype;
			window.location = "home.html";
		}
		else{
			$scope.valid=false;
		}
    });}

});


/*angular.module('home', []).controller('homecontroller', function($scope, $http){
	//POPULATE THESE WITH REST CALL.. FORMULATE REST CALL IN NODE TO MODEL THIS DATA STRUCTURE
	$scope.tickets = {'1000':{'subject': "computer iz broken", 'priority': "Urgent", 'status': "Fresh", 'stack':"Triage", 'id':"1000", 'spawned': "date/time"}, '1001':{'subject': "need a cord", 'priority': "Low Priority", 'status': "Fresh", 'stack':"Triage", 'id':"1001", 'spawned': "date/time"}};
	
	$scope.userickets = {'1004':{'subject': "computer iz broken", 'priority': "Urgent", 'status': "Open", 'stack':"", 'id':"1000", 'spawned': "date/time"}, '1009':{'subject': "help me please", 'priority': "Critical", 'status': "Open", 'stack':"", 'id':"1000", 'spawned': "date/time"}};
});*/


/*
function query(url, method, params) {
        $scope.auth = function(url, method, params){
		var request = $http({
		  method : method,
		  url    : url,
		  data : $.param(params),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		});

    request.success(function (data){
		return data;
    });}
    }
	*/
