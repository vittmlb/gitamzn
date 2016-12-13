/**
 * Created by Vittorio on 28/09/2016.
 */
let vistas_amazon = require('../controllers/vistas_amazon.server.controller');

module.exports = function(app) {

    app.route('/api/vistas_amazon')
        .get(vistas_amazon.list)
        .post(vistas_amazon.create);

    app.route('/api/vistas_amazon/:vistaId')
        .get(vistas_amazon.read)
        .put(vistas_amazon.update)
        .delete(vistas_amazon.delete);

    app.param('vistaId', vistas_amazon.findById);

};