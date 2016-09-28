(function() {
    'use strict';

    blogModule.controller('postsController', ['$scope', '$rootScope', '$log', '$firebaseArray', '$firebaseObject', 'FIREBASE_URL', 'rootRef', 'PostsService',
        function ($scope, $rootScope, $log, $firebaseArray, $firebaseObject, FIREBASE_URL, rootRef, PostsService) {
            $log.info('postsController start');

            var ctrl = this;

            $scope.myVar = "test From My VAR";
            
            ctrl.posts = PostsService.getPosts();

            $log.info('Retrived data are: ', ctrl.posts);
            $log.info('Retrived data are: ', ctrl.posts[0]);

        }]);
})();
