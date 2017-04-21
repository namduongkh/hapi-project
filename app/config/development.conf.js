'use strict';

module.exports = {
    web: {
        connections: [{
            port: 3000,
            labels: ['web']
        }, {
            port: 3100,
            labels: ['admin']
        }]
    }
};