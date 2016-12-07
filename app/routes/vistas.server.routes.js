/**
 * Created by Vittorio on 28/09/2016.
 */
var vistas = require('../controllers/vistas.server.controller');

module.exports = function(app) {

    app.route('/api/vistas')
        .get(vistas.list)
        .post(vistas.create);

    app.route('/api/vistas/:vistaId')
        .get(vistas.read)
        .put(vistas.update)
        .delete(vistas.delete);

    app.param('vistaId', vistas.findById);

};