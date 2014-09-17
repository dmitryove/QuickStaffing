quickStaffingApp.service ('employeeSearchService', function ($http) {
	this.getEmployees = function (_keyword) {
		return $http ({
			method: 'GET',
			url: SERVICE_EMPLOYEE_SEARCH_URL + '?name=' + _keyword,
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		});
	}
});