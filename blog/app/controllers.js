(function() {
    'use strict';

    blogModule.controller('blogController', ['$scope', '$rootScope', '$firebaseArray', '$log', 'Chats', 'Login', 'Session',
        function ($scope, $rootScope, $firebase, $log, Chats, Login, Session) {

            $log.info('blogController start');


            var ctrl = this;

            var ref = new Firebase('https://bozga-chat.firebaseio.com/');
            $scope.chats = Chats;
            var chat = {};


            ctrl.test = "value test";

            /* Watchers
             ========================================================================================================
             */
            //Watch when the value of particDetails changes
            /*
             $scope.$watch(
             function () {
             return Login.authData;
             },
             function (newVal, oldVal) {
             $log.info('ChatsCtrl:$watch => New value in authData', newVal);
             ctrl.authData = newVal;
             },
             true
             );
             */

            if (Login.isLoggedIn()) {
                ctrl.name = Session.getAuthData().facebook.displayName;
                ctrl.id = Session.getAuthData().facebook.id;
            }


            ctrl.login = function () {
                $log.info('ChatsCtrl:login => Login start');
                Login.logIn();
            }

            ctrl.sendChat = function (chat) {
                $log.info("ChatsCtrl:sendChat => check if user is logged");
                if (Login.isLoggedIn()) {
                    $log.info("ChatsCtrl:sendChat => user is logged!!");
                    $scope.chats.$add({
                        user: Session.getAuthData().facebook.displayName,
                        message: chat.message,
                        imgURL: Session.getAuthData().facebook.profileImageURL,
                        id: Session.getAuthData().facebook.id
                    });
                    chat.message = "";
                }
            }

            $scope.logout = function () {
                $log.info('AccountCtrl:logout => Log out start');
                Login.logOut();
            }

        }]);

    blogModule.controller('AccountCtrl', ['$scope', '$rootScope', '$log', 'Login', 'Session',
        function ($scope, $rootScope, $log, Login, Session) {

            $log.info('AccountCtrl start');

            var ctrl = this;
            ctrl.userLoggedName = Session.getFullName();
            ctrl.userLoggedEmail = Session.getEmail();

            ctrl.login = function () {
                $log.info('AccountCtrl:login => Login start');
                Login.logIn().then(function (response) {

                    $log.info("AccountCtrl:login => you are logged")
                });
            };

            ctrl.logout = function () {
                $log.info('AccountCtrl:logout => Log out start');
                Login.logOut();
            }


        }]);
});