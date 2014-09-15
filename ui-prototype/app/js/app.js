var quickStaffingApp = angular.module ('quickStaffingApp', ['ngRoute', 'ngSanitize'])
	.config (function ($routeProvider, $httpProvider) {
		$routeProvider.
			when ('/employee-info/id/:idvalue', {
				controller: employeeInfoController,
				templateUrl: 'employee-info.html'
			}).
			when ('/employee-info/id/:idvalue/skills/:skillsvalue/isrelocation/:isrelocationvalue', {
				controller: employeeInfoController,
				templateUrl: 'employee-info.html'
			}).
			otherwise ({
				redirectTo: '/employee-info'
			}) ;

		$httpProvider.defaults.useXDomain = true;
	});