function employeeInfoController ($scope, $http, $location, $routeParams, employeeInfoService) {
	/* ======================================================== */
	/* properties */
	/* ======================================================== */
	$scope.employeeId = $routeParams.idvalue;

	/* elements */
	$scope.inptOtherSkills = null;
	$scope.inptTitle = null;
	$scope.chckbxNoRelocation = null;

	/* ======================================================== */
	/* methods */
	/* ======================================================== */
	$scope.init = function init () {
		$scope.inptOtherSkills = $('#inptOtherSkills');
		$scope.inptTitle = $('#inptTitle');
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
			$scope.chckbxNoRelocation.attr ('checked', 'checked');
		}
		
		if (typeof $routeParams.skillsvalue != 'undefined') {
			$scope.otherSkills = $routeParams.skillsvalue;
		}
		else {
			$scope.otherSkills = '';
		}
		
		if (typeof $routeParams.employeetitle != 'undefined') {
			$scope.otherTitle = $routeParams.employeetitle;
		}
		else {
			$scope.otherTitle = '';
		}

		$scope.getEmployeeInfo ($scope.employeeId);
		$scope.getEmployeePositions ($scope.employeeId, $scope.otherSkills, $scope.otherTitle, $scope.isRelocation);
	};

	$scope.getEmployeeInfo = function (_id) {
		employeeInfoService.getEmployeeInfo (_id).then (
			function (_data) {
				$scope.employeeInfo = _data.data;
				$scope.employeeInfo.projects = _data.data.projects;

 				$scope.$broadcast ('dataloaded');
			},
			function (_data, _status) {
				$scope.employeeInfo = null;
				alert ('ERROR: error code ' + _status);
			}
		);
	};
	
	$scope.getEmployeePositions = function (_id, _otherSkills, _otherTitle, _isRelocation) {
		var otherSkills = (typeof _otherSkills != 'undefined') ? _otherSkills : '';
		var otherTitle = (typeof _otherTitle != 'undefined') ? _otherTitle : '';
		var isRelocation = (typeof _isRelocation != 'undefined') ? _isRelocation : '';

		employeeInfoService.getEmployeePositions (_id, otherSkills, otherTitle, isRelocation).then (
			function (_data) {
				var positions = _data.data;

				$scope.employeePositions = [];
				$scope.employeeAdditionalPositions = [];
				
				var date = null;
				for (var i = 0; i < positions.length; i++) {
					date = new Date (parseInt (positions[i].startDate));
					positions[i].startDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
					
					if (positions[i].rating >= 1000) {
						$scope.employeePositions.push (positions[i]);
					}
					else {
						$scope.employeeAdditionalPositions.push (positions[i]);
					}
				}
				
				$scope.hasPositions = ($scope.employeePositions && $scope.employeePositions.length);
				$scope.hasAdditionalPositions = ($scope.employeeAdditionalPositions && $scope.employeeAdditionalPositions.length);
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
	
	$scope.onTitleFieldKeyUp = function (_event) {
		$scope.otherTitle = _event.target.value;
	}

	$scope.onNoRelocationClick = function (_event) {
		$scope.isRelocation = !_event.target.checked;
	}

	$scope.onSearchButtonClick = function (_event) {
		var otherSkills = ($scope.otherSkills == '') ? '' : '/skills/' + $scope.otherSkills;
		var otherTitle = ($scope.otherTitle == '') ? '' : '/employeetitle/' + $scope.otherTitle;
		$location.path ('/employee-info/id/' + $scope.employeeId + otherSkills + otherTitle + '/isrelocation/' + $scope.isRelocation);
	}

	/* ======================================================== */
	/* init */
	/* ======================================================== */
	$scope.init ();
}