quickStaffingApp.service ('employeeInfoService', function ($http) {
	this.getEmployeeInfo = function (_id) {
		return $http ({
			method: 'GET',
			url: SERVICE_EMPLOYEE_INFO_URL + "?id=" + _id,
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		});
	}
	
	this.getEmployeePositions = function (_id) {
		return $http ({
			method: 'GET',
			url: SERVICE_EMPLOYEE_POSITIONS_URL + "?id=" + _id,
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		});
	}
});