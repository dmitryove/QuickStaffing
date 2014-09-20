var quickStaffingApp = angular.module ('quickStaffingApp', ['ngRoute', 'ngSanitize'])
	.config (function ($routeProvider, $httpProvider) {
		$routeProvider.
			when ('/employee-info/id/:idvalue', {
				controller: employeeInfoController,
				templateUrl: 'employee-info.html'
			}).
			when ('/employee-info/id/:idvalue/isrelocation/:isrelocationvalue', {
				controller: employeeInfoController,
				templateUrl: 'employee-info.html'
			}).
			when ('/employee-info/id/:idvalue/skills/:skillsvalue', {
				controller: employeeInfoController,
				templateUrl: 'employee-info.html'
			}).
			when ('/employee-info/id/:idvalue/employeetitle/:employeetitle', {
				controller: employeeInfoController,
				templateUrl: 'employee-info.html'
			}).
			when ('/employee-info/id/:idvalue/skills/:skillsvalue/isrelocation/:isrelocationvalue', {
				controller: employeeInfoController,
				templateUrl: 'employee-info.html'
			}).
			when ('/employee-info/id/:idvalue/skills/:skillsvalue/employeetitle/:employeetitle', {
				controller: employeeInfoController,
				templateUrl: 'employee-info.html'
			}).
			when ('/employee-info/id/:idvalue/employeetitle/:employeetitle/isrelocation/:isrelocationvalue', {
				controller: employeeInfoController,
				templateUrl: 'employee-info.html'
			}).
			when ('/employee-info/id/:idvalue/skills/:skillsvalue/employeetitle/:employeetitle/isrelocation/:isrelocationvalue', {
				controller: employeeInfoController,
				templateUrl: 'employee-info.html'
			}).
			when ('/position-info/id/:idvalue', {
				controller: positionInfoController,
				templateUrl: 'position-info.html'
			}).
			otherwise ({
				redirectTo: '/employee-info/id/0'
			});

		$httpProvider.defaults.useXDomain = true;
	});