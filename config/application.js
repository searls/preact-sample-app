module.exports = function(lineman) {
  return {
    removeTasks: {
      common: lineman.config.application.removeTasks.common.concat('jshint')
    },
    watch: {
      lint: {
        tasks: []
      }
    }
  };
};
