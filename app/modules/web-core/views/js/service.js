(function() {
    'use strict';

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