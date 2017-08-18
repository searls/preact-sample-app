var execSync = require('child_process').execSync

module.exports = function (grunt) {
  grunt.registerTask('minify', 'runs babel-minify', function () {
    grunt.log.writeln('minifiying ./generated/js/app.js to ./dist/js')
    execSync('mkdir -p dist/js')
    execSync('./node_modules/.bin/minify generated/js/app.js -d dist/js', {
      stdio: 'inherit'
    })
  })
}
