'use strict';

var offineSvc = {};

exports.followTransaction = {
    handler: function(request, reply) {
        reply({
            status: true,
            message: 'join room',
            room: request.payload
        })
    },
    plugins: {
        'hapi-io': {
            event: 'transactions-notify/join',
            post: function(ctx, next) {

                var room = ctx.data;
                room.forEach(room => {
                    // console.log('join room : ' + room);

                    ctx.socket.join('update-price-' + room);
                });
                next();
            }
        }
    }
};

exports.emitEvent = {
    handler: function(request, reply) {
        return reply({
            status: true,
            message: 'emit success !'
        });
    },
    plugins: {
        'hapi-io': {
            'event': 'event/emit',
            post: function(ctx, next) {
                var data = ctx.data;
                if (data.room) {
                    ctx.socket.in(data.room).emit(data.event, data.data);
                } else {
                    ctx.socket.broadcast.emit(data.event, data.data);
                }

                next();
            }
        }
    }
};

exports.unFollowTransaction = {
    handler: function(request, reply) {
        reply({
            status: true,
            message: 'leave room',
            room: request.payload
        });
    },
    plugins: {
        'hapi-io': {
            event: 'transaction-notify/leave',
            post: function(ctx, next) {
                var room = ctx.data;
                room.forEach(room => {
                    // console.log(' leave room : ' + room);
                    ctx.socket.leave('update-price-' + room);
                });
                next();
            }
        }
    }
};

exports.joinRoom = {
    handler: function(request, reply) {
        reply({
            status: true,
            message: 'join room',
            room: request.payload
        });
    },
    plugins: {
        'hapi-io': {
            event: 'room/join',
            post: function(ctx, next) {
                var options = ctx.data;
                // console.log(options)
                var channel = initChannel(options);
                // console.log('join room ' + channel);
                ctx.socket.join(channel);
                next();
            }
        }
    }
};


exports.leaveRoom = {
    handler: function(request, reply) {
        reply({
            status: true,
            message: 'leave room',
            room: request.payload
        });
    },
    plugins: {
        'hapi-io': {
            event: 'room/leave',
            post: function(ctx, next) {
                var options = ctx.data;
                var channel = initChannel(options);
                ctx.socket.leave(channel);
                next();
            }
        }
    }
};

function initChannel(options) {
    var collectionName = options.collectionName;
    var action = options.action;
    var modelId = options.modelId;
    var method = options.method;

    var names = [];

    /// channel = collectionName/action/modelId/method ;

    names.push(collectionName, action, modelId, method);
    names = names.filter(function(item) { //remove empty element
        return item ? true : false;
    });
    var channel = names.join('/');
    return channel;
}