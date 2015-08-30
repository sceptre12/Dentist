( function(window){
	var angular = window.angular;
	angular.module('dentist', ['ui.router'])
	.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider){
		$urlRouterProvider.otherwise('/home');
		$stateProvider
			.state('dentist',{
				url:'BotwinHome',
				templateUrl: 'index.html'
			})
	}])
}(window));