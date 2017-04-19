/**
 * Created by Vittorio on 13/04/2017.
 */
let settings = require('../controllers/settings.server.controller');

module.exports = function(app) {

    app.route('/api/settings')
        .get(settings.list)
        .post(settings.create);

    app.route('/api/settings/:settingId')
        .get(settings.read)
        .put(settings.update)
        .delete(settings.delete);

    app.param('settingId', settings.findById);

};