function positionInfoController ($scope, $http, $location, $routeParams, positionInfoService) {
	/* ======================================================== */
	/* properties */
	/* ======================================================== */
	$scope.positionId = $routeParams.idvalue;

	/* elements */

	/* ======================================================== */
	/* methods */
	/* ======================================================== */
	$scope.init = function init () {
		$scope.getPositionInfo ($scope.positionId);
		$scope.getPositionEmployees ($scope.positionId);
	};

	$scope.getPositionInfo = function (_id) {
		positionInfoService.getPositionInfo (_id).then (
			function (_data) {
				$scope.positionInfo = _data.data;
 				$scope.$broadcast ('dataloaded');
			},
			function (_data, _status) {
				$scope.positionInfo = null;
				alert ('ERROR: error code ' + _status);
			}
		);
	};
	
	$scope.getPositionEmployees = function (_id) {
		positionInfoService.getPositionEmployees (_id).then (
			function (_data) {
				var employees = _data.data;

				$scope.positionEmployees = employees;
				$scope.positionAdditionalEmployees = [];
				
				$scope.hasEmployees = ($scope.positionEmployees && $scope.positionEmployees.length);
				$scope.hasAdditionalEmployees = ($scope.positionAdditionalEmployees && $scope.positionAdditionalEmployees.length);
 				$scope.$broadcast ('dataloaded');
			},
			function (_data, _status) {
				$scope.positionEmployees = null;
				$scope.positionAdditionalEmployees = null;
				alert ('ERROR: error code ' + _status);
			}
		);
	};
	
	/* ======================================================== */
	/* events */
	/* ======================================================== */

	/* ======================================================== */
	/* init */
	/* ======================================================== */
	$scope.init ();
}