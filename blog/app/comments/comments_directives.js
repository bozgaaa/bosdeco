'use strict';

blogModule.directive('commentList', [
    function () {
        return {
            restrict: 'E',
            scope: {
                contentId: '=',
                contentTitle: '='
            },
            templateUrl: 'comments-list.html',
            controller: 'commentsController',
            controllerAs: 'commentsCtrl'
        };
    }]);