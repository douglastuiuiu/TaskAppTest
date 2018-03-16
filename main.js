var app = angular.module('taskapp', []);

app.directive('alertMsg', [function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                if (confirm("Tem certeza?")) {
                    scope.$apply(scope.deleteTask);
                }
            });
        }
    }
}]);

app.controller('TasksController', function($scope) {

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
        $scope.tasks = [{
            "title": "Gamification",
            "description": "Desenvolver plataforma de gamification para o site da Labelamafia",
            "startDate": "2016-06-14T09:00:00",
            "estimatedTime": 60,
            "status": 'OPENED'
        }, {
            "title": "ERP Interno",
            "description": "Desenvolver ERP para uso interno onde possa-se gerenciar as tasks de cada usuario",
            "startDate": "2016-03-22T09:00:00",
            "estimatedTime": 90,
            "status": 'OPENED'
        }, {
            "title": "Migrar APIs",
            "description": "Migrar APIs escritas em nodejs para ruby on rails",
            "startDate": "2016-02-10T16:30:00",
            "estimatedTime": 180,
            "status": 'IN_PROGRESS'
        }, {
            "title": "Desenvolver DCIM",
            "description": "Desenvolver DCIM - Gerenciamento de datacenters e ambientes críticos",
            "startDate": "2016-07-01T15:00:00",
            "estimatedTime": 240,
            "status": 'FINISHED'
        }];
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

    //persistence functions
    $scope.deleteTask = function deleteTask() {
        $scope.tasks.splice($scope.selectedIdx, 1);
        $scope.clearSelection();
    };

    $scope.editTask = function editTask(task) {
        $scope.new = angular.copy(task);
        //$scope.selectedTask = $scope.new;

        $scope.editMode = true;
        $scope.addEditForm = true;
    };

    $scope.saveTask = function saveTask(valid) {
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
