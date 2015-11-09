/**
 * Created by paigewalters on 11/7/15.
 */
module.exports = function(grunt){
    //Project Config
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%=pkg.name%> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'client/scripts/app.js',
                dest: 'server/public/assets/scripts/app.min.js'
            }
        },
        copy: {
            jquery: {
                expand:true,
                cwd: "node_modules/jquery/dist/",
                src: [
                    "jquery.min.js",
                    "jquery.min.map"
                ],
                "dest": "server/public/vendors/"
            },
            bootstrap: {
                expand:true,
                cwd: "node_modules/bootstrap/dist/css/",
                src: [
                    "bootstrap.min.css"
                ],
                "dest": "server/public/vendors/"
            },
            angular: {
                expand:true,
                cwd: "node_modules/angular/",
                src: [
                    "angular.min.js",
                    "angular.min.js.map"
                ],
                "dest": "server/public/vendors/"
            },
            html: {
                expand: true,
                cwd: "client/views/",
                src: [
                    "index.html"
                ],
                "dest": "server/public/views/"
            },
            css: {
                expand: true,
                cwd: "client/styles/",
                src: [
                    "style.css"
                ],
                "dest": "server/public/assets/styles/"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['copy', 'uglify']);
};