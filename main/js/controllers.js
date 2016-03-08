angular.module('landingapp').controller('home', function($scope, $http, $timeout, $location, $interval) {
    //begins the timer for session timeouts. This entire block of code fires after X length of time
    $scope.sessionTimer = function() {
        $scope.sessTimer = $timeout(function() {

            //toggles the modal to on once the time has passesd
            $('#timeoutmodal').modal('toggle');

            //this fires after 30 seconds and invokes logout()
            $scope.logouttimer = $timeout(function() {
                $scope.logout();
            }, 30000);

            //declares the modal display counter to start at 30
            $scope.count = 30;
            //counts down for display on the modal
            $scope.countdown = $interval(function() {
                $scope.count = $scope.count - 1;
            }, 1000);

        }, 300000);
    };

    //logout function that clears session storage and redirects
    $scope.logout = function() {
        sessionStorage.sesskey = "";
        sessionStorage.usertype = "";
        window.location = "index.html";
    };
    //invoked when the modal's "I'm Still Here!" button is clicked. clears and then restarts the timeoutmodel
    $scope.stillHere = function() {
            //toggles the modal to off once the button is clicked
            $('#timeoutmodal').modal('toggle');
            //cancels the modal's timers
            $interval.cancel($scope.countdown);
            $timeout.cancel($scope.logouttimer);
            //reinvokes the session timer
            $scope.sessionTimer();
        }
        //restart the sessionTimer
    $scope.resetSession = function() {
            $timeout.cancel($scope.sessTimer);
            $scope.sessionTimer();
        }
        //invoked when the page is initialized
    $scope.init = function() {
        //route the user to where they need to go
        if (sessionStorage.usertype === "1" && sessionStorage.sesskey !== "") {
            $location.url("admin");
        } else if (sessionStorage.usertype === "2" && sessionStorage.sesskey !== "") {
            $location.url("tech");
        } else if (sessionStorage.usertype === "3" && sessionStorage.sesskey !== "") {
            $location.url("users");
        } else {
            $location.url("invalid");
        }
        //begin the session timer
        $scope.sessionTimer();
    };
    //invoke init() on page load
    $scope.init();
    $scope.test = "This is home scope...";
});



angular.module('landingapp').controller('techcontroller', function($scope, $http, $location) {
    $scope.test = "This is technician scope only...";
    $scope.init = function() {
        if (sessionStorage.usertype !== "2") {
            $location.url('invalid');
        }
    }
    $scope.init();
});



angular.module('landingapp').controller('userscontroller', function($scope, $http, $location) {
    $scope.test = "This is mortals scope only...";
    $scope.init = function() {
        if (sessionStorage.usertype !== "3") {
            $location.url('invalid');
        }
    }
    $scope.init();
});



angular.module('landingapp').controller('admincontroller', function($scope, $http, $location) {
    $scope.test = "This is admin scope only...";
    $scope.init = function() {
        if (sessionStorage.usertype !== "1") {
            $location.url('invalid');
        }
    }
    $scope.init();
});


angular.module('landingapp').controller('failurecontroller', function($scope, $http, $location) {
    $('#failuremodal').modal('toggle');
    $scope.reroute = function() {
        $('#failuremodal').modal('toggle');
        //reroute the user to where they need to go
        if (sessionStorage.usertype === "1" && sessionStorage.sesskey !== "") {
            $location.url("admin");
        } else if (sessionStorage.usertype === "2" && sessionStorage.sesskey !== "") {
            $location.url("tech");
        } else if (sessionStorage.usertype === "3" && sessionStorage.sesskey !== "") {
            $location.url("users");
        } else {
            window.location = "index.html";
        }
    }
});


//--------------------LOGIN MODULE-------------------------


//login page module
angular.module('login', []).controller('logincontroller', function($scope, $http) {
    //set our validity and loading booleans for user feedback

    //valid is for the incorrect credentials popup
    $scope.valid = true;
    //loading is for the striped loading bar
    $scope.loading = false;
    //default username and password to ""
    $scope.username = "";
    $scope.pass = "";
	
    //authentication function
    $scope.auth = function() {
        var request = $http({
            method: 'POST',
            url: 'http://198.211.99.235:8080/v1/login',
            data: $.param({
                username: $scope.username,
                password: $scope.pass
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        request.success(function(data){
            $scope.loading = true;
            //if the credentials are valid, store the user's id and user's type in session storage, stop loading bar and redirect ($location??)
            if (data.valid == "yes") {
                $scope.loading = false;
                sessionStorage.sesskey = data.sesskey;
                sessionStorage.usertype = data.usertype;
                window.location = "home.html";
				//else, reset the loading bar and show the invalid message
            } else {
                $scope.loading = false;
                $scope.valid = false;
            }
        });
    }
});


/*Query template
$scope.auth = function(){
		var request = $http({
		  method : 'POST',
		  url    : 'http://198.211.99.235:8080/ROUTE',
		  data : $.param({username : $scope.username, password : $scope.pass}),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		});
    request.success(function (data){
        $scope.loading = true;
				//if the credentials are valid, store the user's id and user's type in session storage
				if (data.valid == "yes") {
					$scope.loading = false;
					sessionStorage.sesskey = data.sesskey;
					sessionStorage.usertype = data.usertype;
					window.location = "home.html";
				} else {
					$scope.loading = false;
					$scope.valid = false;
				}
    });}
    
	
	
	$scope.auth = function(method, route, params) {
        var request = $http({
            method: method,
            url: 'http://198.211.99.235:8080/' + route,
            //give params with this syntax {username : $scope.username, password : $scope.pass}
            data: $.param(params),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        request.success(function(data) {
            return data;
        });
    }
	
	
	
	
	
	.factory('queryservice', function($http, $q) {
    return {
        post: function(route, params){
			var deferred = $q.defer();
            var returndata;
            var request = $http({
                method: 'POST',
                url: 'http://198.211.99.235:8080/' + route,
                //give params with this syntax {username : $scope.username, password : $scope.pass}
                data: $.param(params),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(
				function(data){
					alert("farts");
					returndata = JSON.stringify(data);
					alert("about to return " + returndata);
					deferred.resolve(returndata);
					return deferred.promise;
				}
			);
        }
    }

});
   
*/