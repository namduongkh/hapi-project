'use strict';

module.exports = {
    web: {
        db: {
            uri: 'mongodb://localhost/db_helper',
            options: {
                user: '',
                pass: ''
            }
        },
        connections: [{
                port: process.env.BIDY_WEB_PORT || 3000,
                labels: ['web'],
                routes: {
                    cors: {
                        origin: ['*'],
                        credentials: true
                    }
                },
                router: {
                    stripTrailingSlash: false
                }
            },
            {
                port: process.env.BIDY_API_PORT || 3100,
                labels: 'api',
                routes: {
                    cors: {
                        origin: ['*'],
                        credentials: true
                    }
                }
            }
        ],
    }
};