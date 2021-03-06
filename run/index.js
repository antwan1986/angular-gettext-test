'use strict';

// Adding promises to nodes global scope.
require('es6-promise').polyfill();

/**
 *  Acts as an override for module loading. Certain modules
 *  need to load modules other than themselves to function.
 */
var loadingOverrides = {
    'watch': ['html', 'styles', 'scripts', 'watch'],
    'build': ['gettext-extract', 'gettext-compile', 'html', 'styles', 'scripts', 'build'],
    'default': ['gettext-extract', 'gettext-compile', 'html', 'styles', 'scripts', 'build', 'default']
};

/**
 *  Acts as a module loader to require the necessary tasks for a
 *  particular task runner.
 *
 *  @param string runner - The name of the task runner.
 */
module.exports = function(runner) {
    var args = require('yargs').argv,
        desiredModule = (args._[0] || 'default'),                           // If no task specified, use `default`.
        modulesToLoad = loadingOverrides[desiredModule] || [desiredModule]; // Check for module loading overrides.

    modulesToLoad.forEach(function(module) {
        console.log(' FE Skeleton: Loading module - ' + module);
        require('./tasks/' + module + '/');
    });
};
