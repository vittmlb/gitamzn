/**
 * Created by Vittorio on 02/12/2016.
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

let optionsA = {'SearchIndex': 'HomeGarden', 'Keywords': 'spin mop', 'ResponseGroup': 'ItemAttributes,Offers, Cart, Images, Reviews, SalesRank, SearchBins, TopSellers'};

exports.create = function(req, res) {
    let id = extraiIdProduto(req.body.produtoUrl);
    opHelper.execute('ItemLookup', {
        'IdType': 'ASIN',
        'ItemId': id,
        'ResponseGroup': 'ItemAttributes,Images'
    }).then((result) => {
        let item = result.result.ItemLookupResponse.Items.Item;
        let produtoAmazon = new ProdutosAmazon(item);
        scraperjs.StaticScraper.create(produtoAmazon.DetailPageURL).scrape(function ($) {
            return {
                numReviews: $('span #acrCustomerReviewText').get()[0].children[0].data,
                numStars: $('#acrPopover').get()[0].attribs.title,
            };
        }).then(function (result) {
            let numReviews = extraiNumReviews(result.numReviews);
            let numStars = extraiNumStars(result.numStars);
            let historico = {};
            if (produtoAmazon.historico.length == 0) {
                historico.reviews_da_data = 0;
            } else {
                historico.reviews_da_data = numReviews - produtoAmazon.historico[produtoAmazon.historico.length - 1].reviews;
            }
            historico.reviews = numReviews;
            historico.num_stars = numStars;
            historico.price = produtoAmazon.ItemAttributes.ListPrice.Amount;
            produtoAmazon.historico.push(historico);
            produtoAmazon.save(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: `Erro !! Cod: ${err.code} - ${err.message}`
                    });
                } else {
                    res.json(produtoAmazon);
                }
            });
        }).catch(function (err) {
            return res.status(400).send({
                message: err
            });
        });
    });
};

exports.list = function(req, res) {
    ProdutosAmazon.find().sort('-created').exec(function (err, produtosAmazon) {
        if(err) {
            return res.status(400).send({
                message: `Erro !! Cod: ${err.code} - ${err.message}`
            });
        } else {
            res.json(produtosAmazon);
        }
    });
};

exports.read = function(req, res) {
    res.json(req.produtoAmazon);
};

exports.findById = function(req, res, next, id) {
    ProdutosAmazon.findById(id).exec(function (err, produtoAmazon) {
        if(err) return next(`Erro !! Cod: ${err.code} - ${err.message}`);
        if(!produtoAmazon) return next(new Error(`Failed to LOAD produtoAmazon id: ${id}`));
        req.produtoAmazon = produtoAmazon;
        next();
    });
};

exports.xUpdateAll = function(req, res) {
    let produto = req.produtoAmazon;
    produto.historico = [{}];
    for(let i = 0; i < produto.historicos.length; i++) {

        var origem = produto.historicos[i];
        var destino = produto.historico[i];

        destino.data = origem.data;
        destino.reviews_total = origem.venda;
        destino.reviews_da_data = origem.venda_da_data;
        destino.num_stars = origem.num_stars;

    }
    produto.save(function (err) {
        if(err) {
            return res.status(400).send({
                message: `Erro !!! Cod: ${err.code} - ${err.message}`
            });
        } else {
            res.json(produto);
        }
    });
};

exports.delete = function(req, res) {
    let produtoAmazon = req.produtoAmazon;
    produtoAmazon.remove(function (err) {
        if(err) {
            return res.status(400).send({
                message: `Erro !! Cod: ${err.code} - ${err.message}`
            });
        } else {
            res.json(produtoAmazon);
        }
    });
};

exports.updateSoldQuantity = function(req, res) {
    let produtoAmazon = req.produtoAmazon;
    scraperjs.StaticScraper.create(produtoAmazon.DetailPageURL).scrape(function ($) {
        return {
            numReviews: $('span #acrCustomerReviewText').get()[0].children[0].data,
            numStars: $('#acrPopover').get()[0].attribs.title,
        };
    }).then(function (result) {
        let numReviews = extraiNumReviews(result.numReviews);
        let numStars = extraiNumStars(result.numStars);
        let historico = {};
        if (produtoAmazon.historico.length == 0) {
            historico.reviews_da_data = 0;
        } else {
            historico.reviews_da_data = numReviews - produtoAmazon.historico[produtoAmazon.historico.length - 1].reviews;
        }
        historico.reviews = numReviews;
        historico.num_stars = numStars;
        historico.price = produtoAmazon.ItemAttributes.ListPrice.Amount;
        produtoAmazon.historico.push(historico);
        produtoAmazon.save(function (err) {
            if(err) {
                return res.status(400).send({
                    message: `Erro !! Cod: ${err.code} - ${err.message}`
                });
            } else {
                res.json(produtoAmazon);
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

function extraiIdProdutoOld(str) {
    let re = /dp\/\w{10}/;
    let m;

    if ((m = re.exec(str)) !== null) {
        if (m.index === re.lastIndex) {
            re.lastIndex++;
        }
    }

    m = m[0].replace('dp/', '');

    return m;

}

function extraiIdProduto(url) {
    let regex = new RegExp("([a-zA-Z0-9]{10})(?:[/?]|$)");
    let m = url.match(regex);
    if(m) {
        return m[1];
    } else {
        return null;
    }
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


