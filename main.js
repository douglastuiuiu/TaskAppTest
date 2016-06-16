var app = angular.module('taskapp', []);

app.controller('TasksController', function($scope) {

    $scope.search = "";
    $scope.selectedTask = null;
    $scope.selectedIdx = null;
    $scope.editMode = false;
    $scope.addEditForm = false;

    $scope.toggleAddEditForm = function() {
        $scope.new = null;
        $scope.addEditForm = !$scope.addEditForm;
    };

    $scope.selectTask = function(task, index) {
        $scope.selectedIdx = index;
        $scope.selectedTask = task;
    };

    $scope.deleteTask = function deleteTask() {
        $scope.tasks.splice($scope.selectedIdx, 1);
    };

    $scope.editTask = function editTask(task) {
        $scope.selectedTask = task;
        $scope.new = task;
        $scope.editMode = true;
        $scope.addEditForm = true;
    };

    $scope.saveTask = function saveTask(valid) {
        if (!valid) return;

        if ($scope.editMode) {
            //update
            // $scope.tasks.splice($scope.selectedIdx, 1);
            $scope.tasks[$scope.selectedIdx] = $scope.new;
            $scope.editMode = false;
        } else {
            //add
            $scope.tasks.push(angular.copy($scope.new));
        };

        $scope.addEditForm = false;
        $scope.new = null;
    };

    $scope.sensitiveSearch = function(task) {
        if ($scope.search) {
            return task.title.indexOf($scope.search) == 0 || task.description.indexOf($scope.search) == 0;
        }
        return true;
    };

    // for test/example
    $scope.tasks = [{
        "title": "Gamification Labelamafia",
        "description": "Desenvolver plataforma de gamification para o site da Labelamafia",
        "startDate": "2016-06-14 09:00:00",
        "estimatedTime": 60,
        "completed": false
    }, {
        "title": "ERP Interno",
        "description": "Desenvolver ERP para uso interno onde possa-se gerenciar as tasks de cada usuario",
        "startDate": "2016-03-22 09:00:00",
        "estimatedTime": 90,
        "completed": true
    }, {
        "title": "Migrar APIs",
        "description": "Migrar APIs escritas em nodejs para ruby on rails",
        "startDate": "2016-02-10 16:30:00",
        "estimatedTime": 180,
        "completed": false
    }, {
        "title": "Desenvolver DCIM",
        "description": "Desenvolver DCIM - Gerenciamento de datacenters e ambientes críticos",
        "startDate": "2016-07-01 15:00:00",
        "estimatedTime": 240,
        "completed": false
    }];

});

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
