angular.module('starter.services', [])

.factory('Chats', function ($firebaseArray) {

    var chatsRef = new Firebase("https://bozga-chat.firebaseio.com/");
    return $firebaseArray(chatsRef);

})

.factory('Login', ['$log', '$firebaseArray', '$firebaseAuth', 'Session', function ($log, $firebaseArray, $firebaseAuth, Session) {

    var ref = new Firebase('https://bozga-chat.firebaseio.com/');
    var authObj = $firebaseAuth(ref);

    this.isLoggedIn = function isLoggedIn() {
        return Session.getAuthData() !== null;
    };

    this.logIn = function () {
        return authObj.$authWithOAuthPopup('facebook', {
                scope: 'email, user_likes'
            })
            .then(
                function (authData) {
                    Session.setAuthData(authData);
                    return authData;
                },
                function (error) {
                    $q.reject(error);
                }
            );
    };

    this.logOut = function () {
        ref.unauth();
        Session.destroy();
        $log.warn("LoginService:logOut You are logged out!");
    };


    this.login2 = function () {
        var ref = new Firebase('https://bozga-chat.firebaseio.com/');
        ref.authWithOAuthPopup('facebook', function (error, authData) {
            if (error) {
                $log.warn("Login Failed!", error);
            } else {
                $log.info("Authenticated successfully with payload:", authData);
                Session.setAuthData(authData);
            }

        }, {
            remember: "sessionOnly",
            scope: "email,user_likes"
        });
    };

    return this;

}])

.factory('Session', ['$log', function ($log) {
    this._authData = JSON.parse(localStorage.getItem('session.authData'));

    this.getAuthData = function () {
        return this._authData;
    };

    this.setAuthData = function (authData) {
        this._authData = authData;
        localStorage.setItem('session.authData', JSON.stringify(authData));
        return this;
    };

    this.getFacebookAccessToken = function () {
        if (this._authData && this._authData.facebook && this._authData.facebook.accessToken) {
            return this._authData.facebook.accessToken;
        }
        return null;
    };
    
    this.getFullName = function(){
        if (this._authData && this._authData.facebook) {
            return this._authData.facebook.displayName;
        }
    }
    
    this.getEmail = function(){
        if (this._authData && this._authData.facebook) {
            return this._authData.facebook.email;
        }
    }

    /**
     * Destroy session
     */
    this.destroy = function destroy() {
        this.setAuthData(null);
    };

    return this;


}]);