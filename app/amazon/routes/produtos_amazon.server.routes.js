/**
 * Created by Vittorio on 02/12/2016.
 */
let produtos_amazon = require('../controllers/produtos_amazon.server.controller.js');

module.exports = function(app) {

    app.route('/api/produtos_amazon')
        .get(produtos_amazon.list)
        .post(produtos_amazon.create);

    app.route('/api/produtos_amazon/:produtoId')
        .get(produtos_amazon.read)
        .put(produtos_amazon.updateSoldQuantity)
        // .put(produtos_amazon.xUpdateAll)
        .delete(produtos_amazon.delete);

    app.param('produtoId', produtos_amazon.findById);

};