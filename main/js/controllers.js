angular.module('landingapp').controller('home', function($scope, $http, $timeout, $location, $interval) {
    //begins the timer for session timeouts. This entire block of code fires after X length of time
    var sessionTimer = function() {
        sessTimer = $timeout(function() {

            //toggles the modal to on once the time has passesd
            $('#timeoutmodal').modal('toggle');

            //this fires after 30 seconds and invokes logout()
            logouttimer = $timeout(function() {
                $scope.logout();
            }, 30000);

            //declares the modal display counter to start at 30
            $scope.count = 30;
            //counts down for display on the modal
            countdown = $interval(function(){
                $scope.count = $scope.count - 1;
            }, 1000);

        }, 300000);
    };

    //logout function that clears session storage and redirects
    $scope.logout = function(){
        sessionStorage.sesskey = "";
        sessionStorage.usertype = "";
        window.location = "index.html";
    };
    //invoked when the modal's "I'm Still Here!" button is clicked. clears and then restarts the timeoutmodel
    $scope.stillHere = function() {
            //toggles the modal to off once the button is clicked
            $('#timeoutmodal').modal('toggle');
            //cancels the modal's timers
            $interval.cancel(countdown);
            $timeout.cancel(logouttimer);
            //reinvokes the session timer
            sessionTimer();
        }
        //restart the sessionTimer
    $scope.resetSession = function() {
            $timeout.cancel(sessTimer);
            sessionTimer();
        }
        //invoked when the page is initialized
    var init = function() {
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
        sessionTimer();
    };
    //invoke init() on page load
    init();
});




//------------------ Tech Page ----------------//

angular.module('landingapp').controller('techcontroller', function($scope, $http, $location, queryservice) {
    
    /*landingapp.config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }); */
    
    $delInfo = "";
    $scope.stackSelected = 1;
    $scope.table = false;
    $scope.stackOptions = [
        1, 2, 3
    ];
    
    $scope.showTable = function() {
        if ($scope.stackSelected != null) {
            $scope.table = true;
        }
    };
    
    var init = function() {
        if (sessionStorage.usertype !== "2") {
            $location.url('invalid');
        }
    }
    init();
    
    $scope.getTickets = function() {
       // alert("Getting tickets");
        var query = queryservice.query('ticket/v1/' + sessionStorage.sesskey + '/stack/' + $scope.stackSelected , '','GET');
        query.then(function(result) {
            //alert ("Made it here: Tech Page controller...");
            $scope.contents = result;
        });
    };
    $scope.getTickets();
    
    
    $scope.deleteTicket = function(ticketid) {
        //alert(ticket_id);
        var query = queryservice.query('ticket/v1/' + sessionStorage.sesskey + '/delete',  {ticket_id : ticketid}, 'DELETE');
        query.then(function(result) {
            if (result.data.error === "no") {
                alert("Delete Successful");
                $scope.getTickets();
            } else {
                alert("Error: Delete Not Successful");
            }
        });
    };
    
}).factory('queryservice', function($http) {
    return {
        query: function(route, params, methodd){
            return $http({
                method: methodd,
                url: 'http://198.211.99.235:8080/' + route,
                //give params with this syntax {username : $scope.username, password : $scope.pass}
                data: $.param(params),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        }
    }
});




//----------------------User Controller------------------------//

angular.module('landingapp').controller('userscontroller', function($scope, $http, $location, queryservice) {
    $scope.showCreate = false;
    $scope.showTable = true;
    $scope.showError = false;
    $scope.showCreateButton = true;
    $scope.showExitButton = false;
    
    $scope.ticketSubject;
    $scope.ticketDescription;
    
    $scope.cancelButton = function() {
       $scope.ticketSubject = "";
       $scope.ticketDescription = ""; 
    };
    
    $scope.clickCreate = function() {
        $scope.showCreateButton = false;
        $scope.showCreate = true;
        $scope.showTable = false;
        $scope.showExitButton = true;
        
    };
    
    $scope.clickExit = function() {
       $scope.showCreateButton = true;
       $scope.showTable = true;
       $scope.showCreate = false;
       $scope.showExitButton = false;
    };
    
    var init = function() {
        if (sessionStorage.usertype !== "3") {
            $location.url('invalid');
        }
    }
    init();
    
    
    
    $scope.getTickets = function() {
        alert("Getting tickets");
        var query = queryservice.query('ticket/v1/' + sessionStorage.sesskey + '/info/get', '' ,'GET');
        query.then(function(result) {
            if (result.data.error == "no") {
                //alert("Got thes godz");
                $scope.contents = result;
                
            } else {
                $scope.showError = true;
                $scope.showTable = false;
                
                //alert("Uh Oh");
            }
            
        });
    };
    $scope.getTickets();
    
    $scope.createTicket = function() {
        var query = queryservice.query('ticket/v1/' + sessionStorage.sesskey + '/put', {subject: $scope.ticketSubject, description: $scope.ticketDescription} ,'PUT');
        query.then(function(result) {
            if (result.data.error == "no") {
                //alert("Got thes godz");
                alert("Ticket Creation Successful");
                $scope.getTickets();
                $scope.cancelButton();
            } else {
                alert("Ticket Creation Failed");
                
                //alert("Uh Oh");
            }
            
        });
    };
    
}).factory('queryservice', function($http) {
    return {
        query: function(route, params, methodd){
            return $http({
                method: methodd,
                url: 'http://198.211.99.235:8080/' + route,
                //give params with this syntax {username : $scope.username, password : $scope.pass}
                data: $.param(params),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        }
    }
});





//--------------------------------------------------------//

angular.module('landingapp').controller('admincontroller', function($scope, $http, $location, queryservice){
    $scope.showCreateUser = true;
	$scope.createUsers = function(){
		$scope.showcreate = !$scope.showcreate;
        $scope.showCreateUser = !$scope.showCreateUser;
	};
	$scope.cancelMessages = function(){
		$scope.showCreateError = false;
		$scope.showCreateSuccess = false;
        $scope.showDeleteSuccess = false;
        $scope.showDeleteError = false;
	};
	
	$scope.submitCreate = function(){
		$scope.showCreateError = false;
		$scope.showCreateSuccess = false;
		
		var query = queryservice.query('user/v1/'+sessionStorage.sesskey+'/put', {username:$scope.createusername,password:$scope.createpassword,type_id:$scope.createid}, 'PUT');
        query.then(function(result){
            if(result.data.error==="type"||result.data.error==="query"){
				$scope.showCreateError = !$scope.showCreateError;
			}
			else if(result.data.error==="no"){
				$scope.showCreateSuccess = !$scope.showCreateSuccess;
			}
            $scope.getUsers();
        });
	};
    
    $scope.submitDelete = function(id){
        
        var query = queryservice.query('user/v1/'+sessionStorage.sesskey+'/delete', {user_id : id}, 'DELETE');
        query.then(function(result){
            if(result.data.error==="type"||result.data.error==="query"){
				$scope.showDeleteError = !$scope.showDeleteError;
			}
			else if(result.data.error==="no"){
				$scope.showDeleteSuccess = !$scope.showDeleteSuccess;
			}
            $scope.getUsers();
        });
        
    };
    
    $scope.getUsers = function(){
        var query = queryservice.query('user/v1/'+sessionStorage.sesskey+'/get', {}, 'GET');
        query.then(function(result){
            if(result.data.error==="type"||result.data.error==="query"){
				$scope.showDeleteError = !$scope.showDeleteError;
			}
			else if(result.data.error==="no"){
				$scope.users = result.data; 
			}
        });
    };
    var init = function() {
        if (sessionStorage.usertype !== "1") {
            $location.url('invalid');
        }
        $scope.getUsers();
    }
    init();
}).factory('queryservice', function($http) {
    return {
        query: function(route, params, methodd){
            return $http({
                method: methodd,
                url: 'http://198.211.99.235:8080/' + route,
                //give params with this syntax {username : $scope.username, password : $scope.pass}
                data: $.param(params),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        }
    }
});

//-----------------------------------------------------------------------//




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




//--------------------LOGIN MODULE-------------------------//



//login page module
angular.module('login', []).controller('logincontroller', function($scope, $http, queryservice) {
    //set our validity and loading booleans for user feedback
    
    //User creation models
    $scope.username;
    $scope.usernameConfirm;
    $scope.password;
    $scope.passwordConfirm;
    
    //Checks
    $scope.usernamePass;
    $scope.passwordPass;
    
    $scope.usernameError;
    $scope.passwordError = false;
    
    //This is for hiding/showing divs
    $scope.showLogin = true;
    $scope.showCreateUser = false;
    
    //valid is for the incorrect credentials popup
    $scope.valid = true;
    //loading is for the striped loading bar
    $scope.loading = false;
    //default username and password to ""
    $scope.username = "";
    $scope.pass = "";
    
    $scope.createDiv = function() {
        $scope.showLogin = false;
        $scope.showCreateUser = true;
    };
    
    $scope.return = function() {
        $scope.showLogin = true;
        $scope.showCreateUser = false;
        $scope.username = "";
        $scope.usernameConfirm = "";
        $scope.password = "";
        $scope.passwordConfirm = "";
    };
    
    $scope.cancel = function() {
       $scope.username = "";
       $scope.usernameConfirm = "";
       $scope.password = "";
       $scope.passwordConfirm = "";
    };
    
    $scope.checkUsername = function() {
      if ($scope.username == $scope.usernameConfirm) {
          //alert("True");
          $scope.usernamePass = true;
          $scope.usernameError = false;
      } else {
          //alert("False");
          $scope.usernamePass = false;
          $scope.usernameError = true;
      }
    };
    
    $scope.checkPassword = function() {
      if ($scope.password == $scope.passwordConfirm) {
          $scope.passwordPass = true;
          $scope.passwordError = false;
      } else {
          $scope.passwordPass = false;
          $scope.passwordError = true;
      }
    };
    
    $scope.create = function() {
        if ($scope.usernamePass && $scope.passwordPass) {
           var query = queryservice.query('user/v1/put', {username: $scope.username, password : $scope.password}, 'PUT');
           query.then(function(result) {
               if (result.data.error == "yes") {
                   alert("Error: Query has failed");
               } else {
                   alert($scope.username + " has been created!");
                   $scope.showLogin = true;
                   $scope.showCreateUser = false;
                   $scope.username = "";
                   $scope.usernameConfirm = "";
                   $scope.password = "";
                   $scope.passwordConfirm = "";
               }
               
           });
        } else {
            alert("Error: Passwords or Usernames do not match.");
        }
    };
	
    //authentication function
    $scope.auth = function() {
		$scope.loading = true;
        var query = queryservice.query('login/v1', {username: $scope.username,password: $scope.pass}, 'POST');
        query.then(function(result){
            //if the credentials are valid, store the user's id and user's type in session storage, stop loading bar and redirect ($location??)
            if (result.data.valid == "yes") {
                $scope.loading = false;
                sessionStorage.sesskey = result.data.sesskey;
                sessionStorage.usertype = result.data.usertype;
                window.location = "home.html";
			//if the credentials are not valid, set the loading bar to off and show the invalid message
            } else {
                $scope.loading = false;
                $scope.valid = false;
            }
        });
    }
}).factory('queryservice', function($http) {
    return {
        query: function(route, params, methodd){
            return $http({
                method: methodd,
                url: 'http://198.211.99.235:8080/' + route,
                //give params with this syntax {username : $scope.username, password : $scope.pass}
                data: $.param(params),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        }
    }
});