var apiPath = window.location.origin;
if (window.location.port) {
    apiPath = window.settings.services.apiUrl;
}

(function() {
    'use strict';

    const dependencyModules = ["User", "ngCookies"];

    angular
        .module("HapiApp", dependencyModules);
})();