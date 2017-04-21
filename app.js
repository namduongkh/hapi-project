'use strict';

const Hapi = require('hapi');
const Path = require('path');

global.BASE_PATH = __dirname;

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(BASE_PATH, 'public')
            }
        }
    }
});

server.register({
    register: require('hapi-kea-config'),
    options: {
        confPath: BASE_PATH + '/app/config',
        decorateServer: true
    }
}, function(err) {
    console.log("Err", err);
});

var config = server.plugins['hapi-kea-config'];

// var connections = config.get("connections")

server.connection({
    port: 3000,
    labels: 'web'
});

server.connection({
    port: 4000,
    labels: 'cms'
});

require("./app/libs/bootstrap.js")(server);

server.start((err) => {

    if (err) {
        throw err;
    }
    server.connections.forEach(function(connectionSetting) {
        console.log("Server running:", connectionSetting.info.port);
    });
});