module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            controllers: {
                src: ['client/assets/scripts/admin/controllers/*.js', 'client/assets/scripts/teacher/controllers/*.js'],
                dest: 'server/public/assets/scripts/controllers.min.js'
            },
            factories: {
                src: ['client/assets/scripts/admin/factories/*.js', 'client/assets/scripts/teacher/factories/*.js'],
                dest: 'server/public/assets/scripts/factories.min.js'
            }
        },
        copy: {
            vendor: {
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
                    "angular-ui-grid/ui-grid.min.js",
                    "ng-file-upload/dist/ng-file-upload.min.js",
                    "angular-touch/angular-touch.min.js",
                    "angular-touch/angular-touch.min.js.map"
                ],
                "dest": "server/public/vendors/"
            },

            font: {
                expand: true,
                cwd: "node_modules/angular-ui-grid/",
                src: ["ui-grid.ttf", "ui-grid.woff"],
                "dest": "server/public/vendors/angular-ui-grid/"
            },

            pdfmake: {
                expand: true,
                cwd: "client/assets/pdfmake",
                src: "**",
                "dest": "server/public/vendors/pdfmake"
            },

            css: {
                // STYLES
                expand: true,
                cwd: "client/assets/styles/",
                src: "style.css",
                "dest": "server/public/assets/styles"
            },
            // IMAGES
            images: {
                expand: true,
                cwd: "client/images/",
                src: "**",
                "dest": "server/public/images"
            },

            html: {
                // VIEWS
                expand: true,
                cwd: "client/views/",
                src: "**",
                "dest": "server/public/views"
            },

            scripts: {
                // SCRIPTS
                expand: true,
                cwd: "client/assets/scripts/",
                src: ["*.js", "admin/admin.js", "teacher/teacher.js"],
                "dest": "server/public/assets/scripts"
            }
        },

        watch: {
            options: {
                spawn: false
            },
            scripts: {
                files: ['client/**/*.html', 'client/**/*.js', 'client/**/*.css'],
                tasks: ['copy', 'uglify']
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'uglify', 'watch']);

};
