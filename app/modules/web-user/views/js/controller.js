(function() {
    'use strict';

    angular.module("User")
        .controller("UserController", UserController);

    function UserController(UserService, $cookies, $rootScope) {
        var userCtrl = this;
        userCtrl.accountInfo = {};

        userCtrl.getAccount = function() {
            UserService.account().then(function(resp) {
                if (resp.status == 200) {
                    userCtrl.accountInfo = resp.data;
                }
            });
        };

        userCtrl.getAccount();

        userCtrl.login = function() {
            UserService.login({
                    email: userCtrl.form.email,
                    password: userCtrl.form.password,
                })
                .then(function(resp) {
                    console.log("Resp", resp);
                    $cookies.put('token', resp.data.token, {
                        path: "/"
                    });
                    window.location.reload();
                });
        };

        userCtrl.logout = function() {
            UserService.logout()
                .then(function(res) {
                    $cookies.remove('token');
                    window.location.reload();
                }).catch(function(res) {
                    $cookies.remove('token');
                    window.location.reload();
                });
        };

        userCtrl.register = function() {
            UserService.register({
                    email: userCtrl.form.email,
                    password: userCtrl.form.password,
                })
                .then(function(resp) {
                    // console.log("Resp", resp);
                    window.location.reload();
                });
        };
    }
})();