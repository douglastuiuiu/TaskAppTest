angular.module('taskapp')

.directive('alertMsg', [function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                if (confirm("Tem certeza?")) {
                    scope.$apply(scope.delete);
                }
            });
        }
    }
}])

.controller('TaskController', function($scope, TaskService) {

    $scope.search = "";
    $scope.sensitiveSearch = false;
    $scope.selectedTask = null;
    $scope.selectedIdx = null;
    $scope.editMode = false;
    $scope.addEditForm = false;
    $scope.domain = {};

    //trazer do backend
    $scope.domain.statusList = ['OPENED', 'IN_PROGRESS', 'FINISHED'];

    // for test/example
    $scope.init = function() {
        $scope.list();
    }

    //aux functions
    $scope.clearSelection = function() {
        $scope.selectedIdx = null;
        $scope.selectedTask = null;
        $scope.editMode = false;
        $scope.new = null;
        $scope.addEditForm = false;
    };

    $scope.selectTask = function(task, index) {
        if ($scope.selectedIdx === index && !$scope.editMode) {
            $scope.clearSelection()
        }
        else {
            $scope.selectedIdx = index;
            $scope.selectedTask = task;
        }
    };

    $scope.toggleAddEditForm = function() {
        $scope.new = null;
        $scope.addEditForm = !$scope.addEditForm;
    };

    $scope.searching = function(task) {
        if ($scope.search) {
            if ($scope.sensitiveSearch) {
                return task.title.indexOf($scope.search) == 0 || task.description.indexOf($scope.search) == 0;
            }
            else {
                return task.title.toUpperCase().indexOf($scope.search.toUpperCase()) == 0 || task.description.toUpperCase().indexOf($scope.search.toUpperCase()) == 0;
            }
        }
        return true;
    };

    $scope.editTask = function editTask(task) {
        $scope.new = angular.copy(task);

        $scope.editMode = true;
        $scope.addEditForm = true;
    };

    //persistence functions
    $scope.list = function(){
      $scope.tasks = TaskService.list();  
    };
    
    $scope.delete = function() {
        $scope.tasks.splice($scope.selectedIdx, 1);
        $scope.clearSelection();
    };

    $scope.save = function(valid) {
        if (!valid) return;

        //get value from datetime-local input
        $scope.new.startDate = document.querySelector('#formStartDate').value;

        if ($scope.editMode) {
            //update here
            $scope.tasks[$scope.selectedIdx] = $scope.new;
            $scope.clearSelection();
        }
        else {
            //save here
            $scope.tasks.push(angular.copy($scope.new));
        };

        $scope.addEditForm = false;
        $scope.new = null;
    };

    //init
    $scope.init();

});
