/**
 * Created by Vittorio on 12/05/2016.
 */
var Vendedores = require('mongoose').model('VendedorML');
var request = require('request');

exports.create = function(req, res) {

    var sellerId = Number(req.body.vendedorId);
    // var sellerId = 93749855;
    var url = 'https://api.mercadolibre.com/users/' + sellerId;

    request({
        method: 'GET',
        url: url,
        json: true
    }, function(err, response, body) {
        var vendedor = new Vendedores(body);
        vendedor.save(function (err) {
            if(err) {
                return res.status(400).send({
                    message: err
                })
            } else {
                res.json(vendedor);
            }
        });
    });
};

exports.read = function(req, res) {
    res.json(req.vendedor);
};

exports.findById = function(req, res, next, id) {
    Vendedores.findById(id).exec(function (err, vendedor) {
        if(err) return next(err);
        if(!vendedor) return next(new Error(`Failed to load vendedor (id: ${id}`));
        req.vendedor = vendedor;
        next();
    });
};