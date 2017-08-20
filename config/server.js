var _ = require('lodash')

module.exports = {
  drawRoutes: function(app) {
    app.get('/api/search/:query', function(req, res){
      res.json({
        query: req.params.query,
        results: _.shuffle([
          {id: -1, japanese: '「q=' + req.params.query + '」', english: 'No translation necessary'},
          {id: 22, japanese: '知らない', english: 'I dunno'},
          {id: 202, japanese: 'ウンコ', english: 'Poop'},
          {id: 212, japanese: '大阪弁が変だろう', english: 'Osaka dialect is strange'}
        ])})
    });
  }
};
