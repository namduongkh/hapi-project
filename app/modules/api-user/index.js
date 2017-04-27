'use strict';

const Controller = require('./controllers/user.controller.js');

exports.register = function(server, options, next) {
    var configManager = server.plugins['hapi-kea-config'];

    server.route({
        method: 'GET',
        path: '/',
        config: Controller.index
    });

    next();
};

exports.register.attributes = {
    name: 'api-user'
};