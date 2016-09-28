(function() {
    'use strict';

    blogModule.service('rootRef', ['FIREBASE_URL', Firebase]);


    blogModule.service('PostsService', ['$http', '$firebaseObject', 'rootRef', function ($http, $firebaseObject, rootRef) {

        this.getPosts = function getPosts() {
            return $firebaseObject(rootRef.child('posts'))
        };
    }]);
})();