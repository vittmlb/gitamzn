/**
 * Created by Vittorio on 13/12/2016.
 */
let util = require('util');
let OperationHelper = require('apac').OperationHelper;
let scrapy = require('node-scrapy');
let scraperjs = require('scraperjs');

let ProdutosAmazon = require('mongoose').model('ProdutoAmazon');

let opHelper = new OperationHelper({
    awsId: 'AKIAICS5AM5V3NYB6VDA',
    awsSecret: '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',
    assocId: 'myinexcoapp-20'
});

exports.list = function(req, res) {

};