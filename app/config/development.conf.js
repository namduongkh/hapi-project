'use strict';

module.exports = {
    web: {
        context: {
            settings: {
                services: {
                    apiUrl: 'http://localhost:4001',
                    webUrl: 'http://localhost:4000',
                },
            },
            assets: {
                js: [
                    '/libs/jquery/dist/jquery.min.js',
                    '/libs/angular/angular.min.js',
                    '/libs/bootstrap/dist/js/bootstrap.min.js',
                    '/libs/angular-cookies/angular-cookies.min.js',
                    '/libs/angular-animate/angular-animate.min.js',
                    '/libs/angular-toastr/dist/angular-toastr.tpls.min.js',
                    '/libs/angular-loading-bar/build/loading-bar.min.js',
                    '/libs/socket.io-client/dist/socket.io.js',

                    '/assets/js/app.js',
                    '/assets/js/config.js',
                    // '/assets/min/app.min.js',
                ],
                css: [
                    '/libs/bootstrap/dist/css/bootstrap.min.css',
                    '/libs/bootstrap/dist/css/bootstrap-theme.min.css',
                    '/libs/font-awesome/css/font-awesome.min.css',
                    '/libs/angular-loading-bar/build/loading-bar.min.css',
                    '/libs/angular-toastr/dist/angular-toastr.min.css',

                    '/assets/css/styles.css',
                    // '/assets/min/app.min.css',
                ]
            }
        }
    }
};