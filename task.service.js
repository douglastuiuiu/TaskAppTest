angular.module('taskapp')

    .service('TaskService', function($http, $q) {

        var taskService = this;

        taskService.list = list;
        taskService.save = save;
        taskService.remove = remove;

        function list() {
            return tasks;
        }

        function save() {
            //TODO implementar
        }

        function remove() {
            //TODO implementar
        }

        // for tests/mock
        var tasks = [{
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


        return taskService;

    });
