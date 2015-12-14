module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            }
            //build: {
            //    src: 'client/app.js',
            //    dest: 'server/public/assets/scripts/app.min.js'
            //}
        },
        copy: {
            main: {
                expand: true,

                // VENDORS

                cwd: "node_modules/",
                src: [
                    "angular/angular.min.js",
                    "angular/angular.min.js.map",
                    "angular-animate/angular-animate.min.js",
                    "angular-animate/angular-animate.min.js.map",
                    "angular-aria/angular-aria.min.js",
                    "angular-aria/angular-aria.min.js.map",
                    "angular-material/angular-material.min.js",
                    "angular-material/angular-material.min.js.map",
                    "angular-material/angular-material.min.css",
                    "angular-material/angular-material.layouts.min.css",
                    "angular-messages/angular-messages.min.js",
                    "angular-messages/angular-messages.min.js.map",
                    "angular-route/angular-route.min.js",
                    "angular-route/angular-route.min.js.map",
                    "angular-ui-grid/ui-grid.min.css",
                    "angular-ui-grid/ui-grid.min.js"
                ],
                "dest": "server/public/vendors/",

                // STYLES

                cwd: "client/assets/styles/",
                src: "style.css",
                "dest": "server/public/assets/styles",

                // IMAGES

                cwd: "client/images",
                src: "*",
                "dest": "server/public/assets/images",

                // VIEWS

                cwd: "client/",
                src: "views/*",
                "dest": "server/public"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'uglify']);

};
