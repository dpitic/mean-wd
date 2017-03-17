/**
 * Created by dpitic on 26/02/17.
 * Configuration to use SystemJS as the module loader.
 */
(function (global) {
    // Tell SystemJS about the application package.
    var packages = {
        app: {
            main: './bootstrap.js',
            defaultExtension: 'js'
        }
    };

    // Tell SystemJS from where to load the Angular and Rx modules.
    var map = {
        '@angular': 'lib/@angular',
        'rxjs': 'lib/rxjs'
    };

    // Main file for each package of Angular
    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'forms',
        'http',
        'router',
        'platform-browser',
        'platform-browser-dynamic',
    ];

    // Load the UMD file for each package.
    ngPackageNames.forEach(function (pkgName) {
        packages['@angular/' + pkgName] = {
            main: '/bundles/' + pkgName + '.umd.js',
            defaultExtension: 'js'
        };
        map['@angular/' + pkgName + '/testing'] = 'lib/@angular/' + pkgName +
                '/bundles/' + pkgName + '-testing.umd.js';
    });

    // Configure SystemJS
    System.config({
        defaultJSExtensions: true,
        transpiler: null,
        packages: packages,
        map: map
    });
})(this);