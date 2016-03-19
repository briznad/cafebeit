/**
 * Grunt configuration for aWindowNYC
 **/
module.exports = function(grunt) {
    'use strict';

    // load all plugins
    require('matchdep').filterDev('grunt-*').forEach(function(obj) {
        console.log(obj);
        grunt.loadNpmTasks(obj);
    });

    // project configuration
    grunt.initConfig({
        config: {
            sassInput: 'assets/sass/',
            cssOutput: 'assets/css/',
            jsInput: 'assets/js/',
            jsOutput: 'assets/js/built/'
        },

        clean: {
            css: {
                src: ['<%= config.cssOutput %>*.css'],
                options: {
                    force: true
                }
            },
            js: {
                src: ['<%= config.jsOutput %>*.js'],
                options: {
                    force: true
                }
            }
        },

        sass: {
            prod: {
                options: {
                    includePaths: ['<%= config.sassInput %>*/'],
                    outputStyle: 'nested'
                },
                files: {
                    '<%= config.cssOutput %>style.css': '<%= config.sassInput %>style.scss'
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 5 version', 'ie >= 9']
            },
            prod: {
                src: '<%= config.cssOutput %>style.css'
            }
        },

        cssmin: {
            prod: {
                files: {
                    '<%= config.cssOutput %>style.min.css': '<%= config.cssOutput %>style.css'
                }
            }
        },

        jshint: {
            options: {
                boss: true,
                browser: true,
                curly: true,
                eqeqeq: true,
                eqnull: true,
                immed: false,
                latedef: true,
                newcap: true,
                noarg: true,
                node: true,
                sub: true,
                trailing: true,
                laxcomma: true,
                laxbreak: true,
                undef: true,
                debug: true,
                globals: {
                    _: true,
                    $: true,
                    jQuery: true,
                    _gaq: true,
                    Modernizr: true
                }
            },
            gruntfile: {
                src: 'gruntfile.js'
            },
            src: {
                src: ['<%= config.jsInput %>*.js']
            }
        },

        concat: {
            options: {
                stripBanners: true,
                separator: ';'
            },
            js: {
                src: [
                    '<%= config.jsInput %>plugins/jquery-*.js', // jQuery must be the first plugin loaded, as it's depended by jQuery plugins as well as Davis.js
                    '<%= config.jsInput %>plugins/jquery.*.js',
                    '<%= config.jsInput %>plugins/underscore.js',
                    '<%= config.jsInput %>*.js'
                ],
                dest: '<%= config.jsOutput %>do.js'
            }
        },

        uglify: {
            options: {
                beautify: false,
                report: false,
                mangle: true,
                compress: {
                    warnings: true
                }
            },
            js: {
                files: {
                    '<%= config.jsOutput %>do.min.js': '<%= config.jsOutput %>do.js'
                }
            }
        },

        watch: {
            // whenever a coffee file is changed, compile it
            js: {
                files: '<%= config.coffeeInput %>**/*.coffee',
                tasks: ['clean:js', 'jshint', 'concat', 'uglify']
            },
            // whenever a scss file is changed, compile it
            sass: {
                files: '<%= config.sassInput %>**/*.scss',
                tasks: ['clean:css', 'sass', 'autoprefixer', 'cssmin']
            }
        }
    });

    // default task.
    grunt.registerTask('default', ['clean', 'jshint', 'concat', 'uglify', 'sass', 'autoprefixer', 'cssmin']);
};
