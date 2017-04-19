/**
 * Created by Vittorio on 10/05/2016.
 */
let config = require('./config');
let express = require('express');
let http = require('http');
let https = require('https');
let cors = require('cors');
let flash = require('connect-flash');
let methodOverride = require('method-override');
let path = require('path');
let morgan = require('morgan');
let compress = require('compression');
let bodyParser = require('body-parser');
let session = require('express-session');
let request = require('request');
let Schedule = require('node-schedule');

module.exports = function() {

    let app = express();

    if(process.env.NODE_env === 'development') {
        app.use(morgan('dev'));
    } else if(process.env.NODE_env === 'production') {
        app.use(compress());
    }

    app.use(cors());
    app.use(flash());
    app.use(methodOverride());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    app.get('/fetch', function (req, res) {
        let url = 'http://lista.mercadolivre.com.br/_CustId_93749855';
        request(url, function (error, response, body) {
            if(!error && response.statusCode == 200) {
                res.send(body);
            }
        });
    });

    app.use(express.static('./public'));

    require('../app/routes/vendedores_ml.server.routes')(app);
    require('../app/amazon/routes/produtos_amazon.server.routes.js')(app);
    require('../app/amazon/routes/vistas_amazon.server.routes')(app);
    require('../app/routes/settings.server.routes.js')(app);

    return app;

};