(function() {
    'use strict';

    var API_PATH = window.location.origin;
    if (window.location.port) {
        API_PATH = window.settings.services.apiUrl;
    }

    const dependencyModules = [];

    angular
        .module("HapiApp", dependencyModules)
})();