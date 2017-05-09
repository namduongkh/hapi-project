(function() {
    'use strict';

    angular.module("User")
        .controller("UserController", UserController);

    function UserController(UserService, $cookies) {
        var userCtrl = this;
        userCtrl.name = "Phong";

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
                });
        };

        userCtrl.register = function() {
            UserService.register({
                    email: userCtrl.form.email,
                    password: userCtrl.form.password,
                })
                .then(function(resp) {
                    console.log("Resp", resp);
                });
        };
    }
})();