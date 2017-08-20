var _ = require('lodash')

const SENTENCES = [
  {id: 'lol', japanese: 'fake sentence', english: 'No translation necessary'},
  {id: '22', japanese: '知らない', english: 'I dunno'},
  {id: '202', japanese: 'ウンコ', english: 'Poop'},
  {id: '212', japanese: '大阪弁が変だろう', english: 'Osaka dialect is strange'}
]

module.exports = {
  drawRoutes: function(app) {
    app.get('/api/search/:query', function(req, res) {
      // Hack to verify visually results are updating & caching
      SENTENCES.find(s => s.id === 'lol').japanese = 'last query was: ' + req.params.query + ' at ' + new Date()

      res.json({
        query: req.params.query,
        sentences: _.shuffle(SENTENCES)
      })
    })

    app.get('/api/sentence/:id', function (req, res) {
      res.json({
        sentence: SENTENCES.find(sentence => sentence.id === req.params.id)
      })
    })
  }
}
