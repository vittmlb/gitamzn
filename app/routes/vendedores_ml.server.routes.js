/**
 * Created by Vittorio on 12/05/2016.
 */

var vendedores = require('../controllers/vendedores_ml.server.controller');

module.exports = function(app) {

    app.route('/api/vendedores_ml')
        .post(vendedores.create);

    app.route('/api/vendedores_ml/:vendedorId')
        .get(vendedores.read);

    app.param('vendedorId', vendedores.findById);

};