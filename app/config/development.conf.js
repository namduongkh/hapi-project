'use strict';

module.exports = {
    web: {
        settings: {
            services: {
                apiUrl: 'http://localhost:3100',
                webUrl: 'http://localhost:3000',
            },
            socialUrl: {},
            ghn_tracking: 'http://103.20.148.181:24167/Tracking/ViewTracking/',
        },
        assets: {
            js: [
                '/libs/jquery/dist/jquery.min.js',
                '/libs/angular/angular.min.js',
                '/libs/bootstrap/dist/js/bootstrap.min.js',

                '/assets/dist/main-min.js',
            ],
            css: [
                '/libs/bootstrap/dist/css/bootstrap.min.css',
                '/libs/bootstrap/dist/css/bootstrap-theme.min.css',
                '/libs/font-awesome/css/font-awesome.min.css',
                'https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic',
                'https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800',

                '/assets/dist/main.css',
            ]
        }
    }
};