quickStaffingApp.directive ('searchWidget', ['employeeSearchService', '$location', function (employeeSearchService, $location) {
	var ulSuggestions = null;
	var inptKeyword = null;
	
	var onSearchFieldKeyUp = function (_event, _scope) {
		if (_event.target.value) {
			employeeSearchService.getEmployees (_event.target.value).then (
				function (_data) {
					_scope.suggestions = _data.data;
					_scope.hasSuggestions = (_data.data.length != 0);

					if (_data.data.length > 10) {
						ulSuggestions.css ({height : '300px'});
					}
					else {
						ulSuggestions.css ({height : 'auto'});
					}
				},
				function (_data, _status) {
					_scope.suggestions = [];
					alert ('ERROR: error code ' + _status);
				}
			);
		}
		else {
			_scope.suggestions = [];
			_scope.hasSuggestions = false;
		}
	}
	
	var onSwitcherEmployeeClick = function (_event) {
		//alert ('Coming soon...');
		$location.path ('/employee-info/id/0');
	}
	var onSwitcherPositionClick = function (_event) {
		//alert ('Coming soon...');
		$location.path ('/position-info/id/0');
	}

	var linkFn = function (_scope, _element, _attributes) {
		var container = $(_element.children ()[0]);
		ulSuggestions = $(_element.children ()[1]);
		inptKeyword = container.find('INPUT[type="text"]');
		
		_scope.onSearchFieldKeyUp = function (_event) {
			onSearchFieldKeyUp (_event, _scope);
		}
		
		_scope.onSuggestedItemClick = function (_suggestion) {
			$location.path ('/employee-info/id/' + _suggestion.id);
			_scope.hasSuggestions = false;
			inptKeyword.val('');
		}
		
		_scope.onSwitcherClick = onSwitcherClick;
	}

	return {
		restrict: 'E',
		link: linkFn
	}
}]);