(function() {
    'use strict';

    angular.module('Core', [])
        .config(["$interpolateProvider", function($interpolateProvider) {
            $interpolateProvider.startSymbol('{[');
            $interpolateProvider.endSymbol(']}');
        }]);
})();
(function() {
    'use strict';

    Socket.$inject = ["$cookies", "$window"];
    PubSub.$inject = ["Socket"];
    angular.module('Core')
        .service("Socket", Socket)
        .service("PubSub", PubSub)

    function Socket($cookies, $window) {

        var jwt = $cookies.get('token');
        console.log("jwt", jwt);
        if (!jwt || !jwt.length) {
            console.log('There is no token');
        }

        var socket = io($window.settings.services.apiUrl + '/');
        socket.on('connect', function() {
            socket.emit('authenticate', {
                token: jwt
            });
            socket.on('authenticated', function() {
                console.log('User is authenticated');
            });
            socket.on('unauthorized', function(msg) {
                console.log("unauthorized: " + JSON.stringify(msg.data));
                // throw new Error(msg.data.type);
            });
            socket.on('keepAlive', function(data) {
                console.log(data)
            })
        });

        socket.on('connect_failed', function() {
            console.log("socket connect_failed");
            // alert('connect_failed');
            location.reload();
        });

        socket.on('error', function() {
            console.log("socket error");
            // alert('error');
            location.reload();
        });

        socket.on('disconnect', function() {
            console.log("socket disconnect");
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                // alert("socket disconnect");
                location.reload();
            }
        });

        return socket;
    };

    function PubSub(Socket) {
        var container = [];
        return {
            initChanel: function(options) {
                var collectionName = options.collectionName;
                var action = options.action;
                var modelId = options.modelId;
                var method = options.method;

                var names = [];

                names.push(collectionName, action, modelId, method);
                names = names.filter(function(item) { //remove empty element
                    return item ? true : false;
                });
                var channel = names.join('/');
                return channel;
            },
            subscribe: function(options, callback, where) {
                if (options) {
                    var channel = this.initChanel(options);
                    console.log("subscribe: " + channel, where);
                    container.push(channel);
                    return Socket.on(channel, callback);
                } else {
                    throw 'Options must be an object';
                }
            },
            publish: function(options, data, callback) {
                if (options) {
                    var channel = this.initChanel(options);
                    console.log("publish : " + channel);
                    Socket.emit(channel, data, callback);
                } else {
                    throw 'Options must be an object';
                }
            },
            unsubcribe: function(options) {
                var channel = this.initChanel(options);
                var index = container.indexOf(channel);
                container.splice(index, 1);
                Socket.removeAllListeners(container[index]);
            },
            unsubscribeAll: function() {
                for (var index = 0; index < container.length; index++) {
                    Socket.removeAllListeners(container[index]);
                }
                container = [];
            }
        }
    }
})();
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

    UserController.$inject = ["UserService", "$cookies", "$rootScope", "toastr", "$timeout", "PubSub"];
    angular.module("User")
        .controller("UserController", UserController);

    function UserController(UserService, $cookies, $rootScope, toastr, $timeout, PubSub) {
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