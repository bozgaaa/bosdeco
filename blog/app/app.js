'use strict';

/* Create our angular application and inject the blogModule
 * app => Application name
 * blogModule => our training module
 */
var app = angular.module('blogApp', ['blog']);

var blogModule = angular.module('blog', ['ui.bootstrap', 'ngResource', 'ngRoute', 'firebase']);

/**
 * CONSTANTS
 */
blogModule.constant('FIREBASE_URL', 'https://bosdeco-blog.firebaseio.com');


    // configuring our routes for training module
// =============================================================================
    blogModule.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/blog', {
                templateUrl: 'app/posts/post_list.html',
                controller: 'postsController',
                controllerAs: 'postsCtrl'
            })

            .when('/blog/garnissage', {
                templateUrl: 'template/etapes_garnissage.html',
                controller: 'postsController',
                controllerAs: 'postsCtrl'
            })

        .otherwise('/blog');

    }]);
// =============================================================================


var posts = { posts:
[
    {
        id:1,
        title:'Les etapes du garnissage',
        description:'La réalisation d’un siège en crin, à l’ancienne, est composé de différentes étapes, véritables couches et sous-couches qui, mises ensemble, donnent la forme finale de votre fauteuil.',
        comments:
        {
            id:1,
            datetime:'12-09-2016',
            name:'Thomas',
            comment:'Très beau travail'
        }
    },
    {
        id:2,
        title:'Moderniser un vieux siège ?',
        description:'Vous n\'imaginez pas à quel point un vieux siège poussiéreux peut devenir une magnifique pièce décorative, et pleine de charme...',
        comments:
        {
            id:1,
            datetime:'12-09-2016',
            name:'David',
            comment:'Excellent post'
        }
    }
]
};
