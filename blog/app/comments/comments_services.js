(function() {
    'use strict';

    blogModule.service('CommentsService', ['$http', function ($http) {
        this.getComments = function (id) {
            return $http.get('/api/content/render/false/type/json/query/+structureName:Comments%20+(conhost:48190c8c-42c4-46af-8d1a-0cd5db894797%20conhost:SYSTEM_HOST)%20+News-Comments:' + id + '%20+languageId:1%20+deleted:false%20+working:true/orderby/modDate%20desc')
                .success(function (data) {
                    angular.forEach(data.contentlets, function (item) {
                        item.datePublished = new Date(item.datePublished);
                    });
                })
                .error(function (data, status) {
                    console.log('ERROR: ' + status + '. We can\'t get the comments right now, please try again later');
                });
        };
    }]);
})();