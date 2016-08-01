var app=angular.module('myApp',['ngRoute','ngResource'])

app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl:'main.html',
		controller:'mainController'
	});
});

app.factory('earningsService',function($resource){
	return $resource('/api/earnings/:id', {id:'@userId'}, {
    update: {
      method: 'put'
    }
});
});

app.factory('addearningsService',function($resource){
	return $resource('/api/earnings/')
});

app.factory('redeemService',function($resource){
	return $resource('/api/redeem/:id', {id:'1'}, {
    update: {
      method: 'put'
    }
});
});

app.controller('mainController',function($scope,earningsService,redeemService,addearningsService){

	var getRandomSpan = function(){
  		return Math.floor((Math.random()*6)+1);
	}

	$scope.userEarnings=earningsService.query();
	$scope.userId="1";
	maximum=100
	minimum=50
	$scope.earning={earnings:$scope.earnings,userId:"1"};
	$scope.addEarnings=function(){
		$scope.earning.earnings=Math.floor((Math.random()*(maximum-minimum+1))+minimum);
		
		

		if($scope.userEarnings.length>0){
			earningsService.update($scope.earning,function(response){
				$scope.leftEarnings=response.earnings
			});

		}
	else{
			addearningsService.save($scope.earning,function(){
				$scope.userEarnings=earningsService.query(function(response){
					$scope.leftEarnings=response.earnings
				});
			});
	}
	}

	$scope.redeemEarnings=function(){
		maximum=70
		minimum=30
		$scope.earning.earnings=Math.floor((Math.random()*(maximum-minimum+1))+minimum);
		$scope.earning.userId="1";
		

		if($scope.userEarnings.length>0){
			var result=redeemService.update($scope.earning,function(response){
				console.log(response);
				$scope.redeemError='';
				$scope.redeemError=response.token;
				if(!response.token)
					$scope.leftEarnings=response.earnings
			});
			// var response=angular.fromJson(result)
			
			
			//console.log(result);
		//	$scope.redeemError=result.msg;
			//$scope.earning=earningsService.query();
		}
		else{
			$scope.redeemError='';
			$scope.redeemError='No User exist';
			
		}
	// else{
	// 		addearningsService.save($scope.earning,function(){
	// 			$scope.userEarnings=earningsService.query();
	// 		});
	// }
	}

	

});
