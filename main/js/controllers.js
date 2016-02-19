var modobj = angular.module('login',[]);
var modobj2 = angular.module('home',[]);
modobj.controller('inputformController', function($scope){

});
modobj.controller('home', function($scope){
	//POPULATE THESE WITH REST CALL
	$scope.tickets = {'1000':{'subject': "computer iz broken", 'priority': "Urgent", 'status': "Fresh", 'stack':"Triage", 'id':"1000", 'spawned': "date/time"}, '1001':{'subject': "need a cord", 'priority': "Low Priority", 'status': "Fresh", 'stack':"Triage", 'id':"1001", 'spawned': "date/time"}};
	
	$scope.userickets = {'1004':{'subject': "computer iz broken", 'priority': "Urgent", 'status': "Open", 'stack':"", 'id':"1000", 'spawned': "date/time"}, '1009':{'subject': "help me please", 'priority': "Critical", 'status': "Open", 'stack':"", 'id':"1000", 'spawned': "date/time"}};
    
    

});
