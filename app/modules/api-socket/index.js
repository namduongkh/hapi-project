'use strict';

// const socketioJwt = require('socketio-jwt');
const SocketController = require('./controller/socket.controller.js');
exports.register = function(server, options, next) {

    var configManager = server.plugins['hapi-kea-config'];
    var io = server.plugins['hapi-io'].io;

    io.on('connection', function(socket) {
        console.log('--On Connection--');
        socket.on('error', function(err) {
            console.log('-- Socket Err --');
            console.log(err);
        });
    });

    /////  Register route use hapi-io event
    // server.route({
    //     method: 'POST',
    //     path: '/api/socket/notify/transactions/join',
    //     config: SocketController.followTransaction
    // });

    // server.route({
    //     method: 'POST',
    //     path: '/api/socket/notify/transactions/leave',
    //     config: SocketController.unFollowTransaction
    // });

    server.route({
        method: 'POST',
        path: '/api/socket/room/join',
        config: SocketController.joinRoom
    });

    server.route({
        method: 'POST',
        path: '/api/socket/room/leave',
        config: SocketController.leaveRoom
    });

    server.route({
        method: 'POST',
        path: '/api/socket/event/emit',
        config: SocketController.emitEvent
    })


    next();
};

exports.register.attributes = {
    name: 'api-socket'
};