quickStaffingApp.service ('positionInfoService', function ($http) {
	this.getPositionInfo = function (_id) {
		return $http ({
			method: 'GET',
			url: SERVICE_POSITION_INFO_URL,
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		});
	}
	
	this.getPositionEmployees = function (_id) {
		return $http ({
			method: 'GET',
			url: SERVICE_POSITION_EMPLOYEES_URL,
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		});
	}
});