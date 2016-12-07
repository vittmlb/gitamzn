/**
 * Created by Vittorio on 02/12/2016.
 */

var util = require('util');
var OperationHelper = require('apac').OperationHelper;
var scrapy = require('node-scrapy');
var scraperjs = require('scraperjs');

var Produtos = require('mongoose').model('Produto');

var opHelper = new OperationHelper({
    awsId: 'AKIAICS5AM5V3NYB6VDA',
    awsSecret: '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',
    assocId: 'myinexcoapp-20'
});

var optionsA = {'SearchIndex': 'HomeGarden', 'Keywords': 'spin mop', 'ResponseGroup': 'ItemAttributes,Offers, Cart, Images, Reviews, SalesRank, SearchBins, TopSellers'};

exports.create = function(req, res) {
    var id = extraiIdProduto(req.body.produtoUrl);
    opHelper.execute('ItemLookup', {
        'IdType': 'ASIN',
        'ItemId': id,
        'ResponseGroup': 'ItemAttributes,Images'
    }).then((result) => {
        let item = result.result.ItemLookupResponse.Items.Item;
        let produto = new Produtos(item);
        scraperjs.StaticScraper.create(produto.DetailPageURL).scrape(function ($) {
            return {
                numReviews: $('span #acrCustomerReviewText').get()[0].children[0].data,
                numStars: $('#acrPopover').get()[0].attribs.title,
            };
        }).then(function (result) {
            let numReviews = extraiNumReviews(result.numReviews);
            let numStars = extraiNumStars(result.numStars);
            let historico = {};
            if(produto.historico.length == 0) {
                historico.venda_da_data = 0;
            } else {
                historico.venda_da_data = numReviews - produto.historico[produto.historico.length - 1].venda;
            }
            historico.venda = numReviews;
            historico.num_stars = numStars;
            produto.historico.push(historico);
            produto.save(function (err) {
                if(err) {
                    return res.status(400).send({
                        message: err
                    });
                } else {
                    res.json(produto);
                }
            });
        });
    });
};

exports.list = function(req, res) {
    Produtos.find().sort('-created').exec(function (err, produtos) {
        if(err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(produtos);
        }
    });
};

exports.read = function(req, res) {
    res.json(req.produto);
};

exports.findById = function(req, res, next, id) {
    Produtos.findById(id).exec(function (err, produto) {
        if(err) return next(err);
        if(!produto) return next(new Error(`Failed to LOAD produto id: ${id}`));
        req.produto = produto;
        next();
    });
};

exports.update = function(req, res) {
    var produto = req.produto;
    scraperjs.StaticScraper.create(produto.DetailPageURL).scrape(function ($) {
        return $('#acrCustomerReviewText').get();
    }).then(function (result) {
        var data  = result[0].children[0].data;
        var numReviews = extraiNumReviews(data);

        res.json(produto);
    });
};

exports.delete = function(req, res) {
    let produto = req.produto;
    produto.remove(function (err) {
        if(err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(produto);
        }
    });
};

exports.updateSoldQuantity = function(req, res) {
    let produto = req.produto;
    scraperjs.StaticScraper.create(produto.DetailPageURL).scrape(function ($) {
        return $('#acrCustomerReviewText').get();
    }).then(function (result) {
        let data = result[0].children[0].data;
        let numReviews = extraiNumReviews(result.numReviews);
        let numStars = extraiNumStars(result.numStars);
        let historico = {};
        if(produto.historico.length == 0) {
            historico.venda_da_data = 0;
        } else {
            historico.venda_da_data = numReviews - produto.historico[produto.historico.length - 1].venda;
        }
        historico.venda = numReviews;
        produto.historico.push(historico);
        produto.save(function (err) {
            if(err) {
                return res.status(400).send({
                    message: err
                });
            } else {
                res.json(produto);
            }
        });
    });
};

exports.listar = function(req, res) {
    opHelper.execute('ItemSearch', {
        'SearchIndex': 'HomeGarden',
        'Keywords': 'spin mop',
        'ResponseGroup': 'ItemAttributes,Offers,Reviews'
    }).then((response) => {
        console.log("Results object: ", response.result);
        console.log("Raw response body: ", response.responseBody);
        res.json(response);
    }).catch((err) => {
        console.error("Something went wrong! ", err);
    });
};

function extraiIdProduto(str) {
    var re = /dp\/\w{10}/;
    var m;

    if ((m = re.exec(str)) !== null) {
        if (m.index === re.lastIndex) {
            re.lastIndex++;
        }
    }

    m = m[0].replace('dp/', '');

    return m;

}

function extraiNumReviews(str) {
    let numReviews = str.replace(' customer reviews', '');
    numReviews = parseInt(numReviews.replace(',', ''));
    return numReviews;
}

function extraiNumStars(str) {
    let numStars = str.replace(' out of 5 stars', '');
    return Number(numStars);
}


