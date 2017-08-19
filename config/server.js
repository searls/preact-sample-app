/* Define custom server-side HTTP routes for lineman's development server
 *   These might be as simple as stubbing a little JSON to
 *   facilitate development of code that interacts with an HTTP service
 *   (presumably, mirroring one that will be reachable in a live environment).
 *
 * It's important to remember that any custom endpoints defined here
 *   will only be available in development, as lineman only builds
 *   static assets, it can't run server-side code.
 *
 * This file can be very useful for rapid prototyping or even organically
 *   defining a spec based on the needs of the client code that emerge.
 *
 */
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
