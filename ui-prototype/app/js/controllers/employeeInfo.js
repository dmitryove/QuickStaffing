function employeeInfoController ($scope, $http, $location, $routeParams, employeeInfoService) {
	/* ======================================================== */
	/* properties */
	/* ======================================================== */
	$scope.employeeId = $routeParams.idvalue;
	$scope.otherSkills = $routeParams.skillsvalue;
	$scope.isRelocation = false;
	
	/* elements */
	$scope.inptOtherSkills = null;
	$scope.chckbxNoRelocation = null;

	/* ======================================================== */
	/* methods */
	/* ======================================================== */
	$scope.init = function init () {
		$scope.inptOtherSkills = $('#inptOtherSkills');
		$scope.chckbxNoRelocation = $('#chckbxNoRelocation');

		if (typeof $routeParams.isrelocationvalue != 'undefined') {
			if ($routeParams.isrelocationvalue == 'true') {
				$scope.isRelocation = true;
				$scope.chckbxNoRelocation.removeAttr ('checked');
			}
			else {
				$scope.isRelocation = false;
				$scope.chckbxNoRelocation.attr ('checked', 'checked');
			}
		}
		else {
			$scope.isRelocation = false;
			$scope.chckbxNoRelocation.removeAttr ('checked');
		}

		$scope.getEmployeeInfo ($scope.employeeId);
		$scope.getEmployeePositions ($scope.employeeId);
	};

	$scope.getEmployeeInfo = function (_id) {
		employeeInfoService.getEmployeeInfo (_id).then (
			function (_data) {
				$scope.employeeInfo = _data.data.employeeInfo;
 				$scope.$broadcast ('dataloaded');
			},
			function (_data, _status) {
				$scope.employeeInfo = null;
				alert ('ERROR: error code ' + _status);
			}
		);
	};
	
	$scope.getEmployeePositions = function (_id) {
		employeeInfoService.getEmployeePositions (_id).then (
			function (_data) {
				$scope.employeePositions = _data.data.employeePositions;
				$scope.employeeAdditionalPositions = _data.data.additionalPositions;
 				$scope.$broadcast ('dataloaded');
			},
			function (_data, _status) {
				$scope.employeePositions = null;
				alert ('ERROR: error code ' + _status);
			}
		);
	};
	
	/* ======================================================== */
	/* events */
	/* ======================================================== */
	$scope.onSkillsFieldKeyUp = function (_event) {
		$scope.otherSkills = _event.target.value;
	}
	
	$scope.onNoRelocationClick = function (_event) {
		$scope.isRelocation = !_event.target.checked;
	}

	$scope.onSearchButtonClick = function (_event) {
		$location.path ('/employee-info/id/' + $scope.employeeId + '/skills/' + $scope.otherSkills + '/isrelocation/' + $scope.isRelocation) ;
	}

	/* ======================================================== */
	/* init */
	/* ======================================================== */
	$scope.init ();
}