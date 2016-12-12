/**
 * Created by Vittorio on 04/12/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProdutoAmazonSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    ASIN: {
        type: String,
        trim: true,
        required: 'O Campo ASIN é obrigatório',
        unique: true
    },
    DetailPageURL: {
        type: String,
        trim: true
    },
    ItemAttributes: {
        Binding: {
            type: String,
            trim: true
        },
        Brand: {
            type: String,
            trim: true
        },
        EAN: {
            type: String,
            trim: true
        },
        // EANList: {},
        Feature: {},
        // ItemDimensions: {},
        Label: {
            type: String,
            trim: true
        },
        ListPrice: {},
        MPN: {
            type: String,
            trim: true
        },
        Manufacturer: {
            type: String,
            trim: true
        },
        Model: {
            type: String,
            trim: true
        },
        // PackageDimensions: {},
        // PackageQuantity: {
        //     type: Number
        // },
        // PartNumber: {
        //     type: String,
        //     trim: true
        // },
        ProductGroup: {
            type: String,
            trim: true
        },
        ProductTypeName: {
            type: String,
            trim: true
        },
        Publisher: {
            type: String,
            trim: true
        },
        PublicationDate: {},
        Size: {
            type: String,
            trim: true
        },
        Studio: {
            type: String,
            trim: true
        },
        Title: {
            type: String,
            trim: true
        },
        UPC: {
            type: String,
            trim: true
        },
        UPCList: {},
        Warranty: {
            type: String,
            trim: true
        }
    },
    ImageSets: {
        ImageSet: [
            {
                LargeImage: {
                    URL: {}
                }
            }
        ]
    },
    historico: [
        {
            data: {
                type: Date,
                default: Date.now
            },
            venda: Number,
            venda_da_data: Number,
            num_stars: Number
        }
    ],
    LargeImage: {
        URL: {
            type: String,
            trim: true
        }
    },
    virtual: {}
});

ProdutoAmazonSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

ProdutoAmazonSchema.virtual('media.venda').get(function () {
    let vendaTotal = this.historico[this.historico.length - 1].venda - this.historico[0].venda;
    return vendaTotal / dayDiff(this.historico[0].data, this.historico[this.historico.length - 1].data);
});

ProdutoAmazonSchema.virtual('virtual.thumbnail').get(function () {
    if (this.LargeImage.URL) {
        return this.LargeImage.URL
    }
    return this.ImageSets.ImageSet[0].LargeImage.URL;
});

ProdutoAmazonSchema.virtual('virtual.title').get(function () {
    return this.ItemAttributes.Title;
});

ProdutoAmazonSchema.virtual('virtual.price').get(function () {
    return this.ItemAttributes.ListPrice.Amount / 100;
});

ProdutoAmazonSchema.virtual('virtual.categoria').get(function () {
    return this.ItemAttributes.ProductGroup;
});

ProdutoAmazonSchema.virtual('virtual.num_stars').get(function () {
    return this.historico[this.historico.length - 1].num_stars;
});

ProdutoAmazonSchema.virtual('virtual.num_reviews').get(function () {
    return this.historico[this.historico.length -1].venda;
});

function dayDiff(firstDate, secondDate) {
    return Math.round((secondDate - firstDate) / (1000 * 60 * 60 * 24));
}


mongoose.model('ProdutoAmazon', ProdutoAmazonSchema);