(function() {
    'use strict';

    blogModule.controller('commentsController', ['$scope', '$rootScope', '$firebaseArray', '$log', 'CommentsService',
        function ($scope, $rootScope, $firebase, $log, CommentsService) {

            $log.info('commentsController start');

            CommentsService.getComments($scope.contentId)
                .then(function(response) {
                    $scope.comments = response.data.contentlets;
                });

        }]);
})();
