quickStaffingApp.service ('employeeInfoService', function ($http) {
	this.getEmployeeInfo = function (_id) {
		return $http ({
			method: 'GET',
			url: SERVICE_EMPLOYEE_INFO_URL + _id,
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		});
	}
	
	this.getEmployeePositions = function (_id, _otherSkills, _isRelocation) {
		var employeeSkills = (_otherSkills != '') ? '&employeeSkills=' + _otherSkills : '';
		var relocate = (_isRelocation != '') ? '&relocate=' + _isRelocation : '';
		return $http ({
			method: 'GET',
			url: SERVICE_EMPLOYEE_POSITIONS_URL + '?employeeId=' + _id + employeeSkills + relocate,
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		});
	}
});