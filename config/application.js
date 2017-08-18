module.exports = function(lineman) {
  return {
    loadNpmTasks: ['grunt-standard'],
    appendTasks: {
      common: lineman.config.application.removeTasks.common.concat('standard')
    },
    removeTasks: {
      common: lineman.config.application.removeTasks.common.concat('jshint')
    },
    standard: {
      app: {
        src: [lineman.config.files.js.app]
      }
    },
    watch: {
      lint: {
        tasks: ['standard']
      }
    }
  };
};
