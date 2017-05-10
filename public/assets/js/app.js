(function() {
    'use strict';

    angular.module('User', [])
        .config(["$interpolateProvider", function($interpolateProvider) {
            $interpolateProvider.startSymbol('{[');
            $interpolateProvider.endSymbol(']}');
        }]);
})();
(function() {
    'use strict';

    UserController.$inject = ["UserService", "$cookies", "$rootScope", "toastr", "$timeout"];
    angular.module("User")
        .controller("UserController", UserController);

    function UserController(UserService, $cookies, $rootScope, toastr, $timeout) {
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
                    console.log("Resp", resp);
                    // window.location.reload();
                    toastr.success("Đăng ký tài khoản thành công!", "Thông báo!");
                    $timeout(userCtrl.login, 2000);
                })
                .catch(function(resp) {
                    var error = resp.data;
                    toastr.error(error.message || error, "Thông báo!");
                });
        };
    }
})();
(function() {
    'use strict';

    UserService.$inject = ["$http"];
    angular.module("User")
        .service("UserService", UserService);

    function UserService($http) {
        var account;
        return {
            login: function(data) {
                return $http({
                    method: "POST",
                    url: apiPath + "/api/user/login",
                    data: data
                });
            },
            logout: function(data) {
                return $http({
                    method: "GET",
                    url: apiPath + "/api/user/logout",
                });
            },
            account: function(data) {
                if (!account) {
                    account = $http({
                        method: "GET",
                        url: apiPath + "/api/user/account",
                    });
                }
                return account;
            },
            register: function(data) {
                return $http({
                    method: "POST",
                    url: apiPath + "/api/user/register",
                    data: data
                });
            },
        }
    }
})();