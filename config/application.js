module.exports = function(lineman) {
  return {
    loadNpmTasks: ['grunt-standard'],
    appendTasks: {
      common: lineman.config.application.removeTasks.common.concat('standard'),
      dist: lineman.config.application.removeTasks.dist.concat('minify')
    },
    removeTasks: {
      common: lineman.config.application.removeTasks.common.concat('jshint'),
      dist: lineman.config.application.removeTasks.dist.concat('uglify')
    },
    standard: {
      options: {
        globals: [
          'preact',
          'h'
        ]
      },
      app: {
        src: [lineman.config.files.js.app],
      }
    },
    watch: {
      lint: {
        tasks: ['standard']
      }
    }
  };
};
