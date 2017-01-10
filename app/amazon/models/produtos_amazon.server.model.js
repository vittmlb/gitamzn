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
        ListPrice: {
            FormattedePrice: {},
            CurrencyCode: {},
            Amount: {
                type: Number,
                default: 0
            }
        },
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
            reviews: Number, // Número total acumulado de reviews
            reviews_da_data: Number, // Total de reviews feitas entre a última e a atual medição
            num_stars: Number, // Média de avaliaçao do produto na data da medição.
            price: Number, // Preço do produto na data da medição.
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
    let vendaTotal = this.historico[this.historico.length - 1].reviews_total - this.historico[0].reviews_total;
    return vendaTotal / dayDiff(this.historico[0].data, this.historico[this.historico.length - 1].data);
});

ProdutoAmazonSchema.virtual('virtual.media.reviews').get(function () {
    let vendaTotal = this.historico[this.historico.length - 1].reviews - this.historico[0].reviews;
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
    if (this.ItemAttributes.ListPrice.Amount) {
        return this.ItemAttributes.ListPrice.Amount / 100;
    }
    return 0;
});

ProdutoAmazonSchema.virtual('virtual.categoria').get(function () {
    return this.ItemAttributes.ProductGroup;
});

ProdutoAmazonSchema.virtual('virtual.num_stars').get(function () {
    return this.historico[this.historico.length - 1].num_stars;
});

ProdutoAmazonSchema.virtual('virtual.num_reviews').get(function () {
    return this.historico[this.historico.length -1].reviews;
});

ProdutoAmazonSchema.virtual('virtual.faturamento.mes.corrente').get(function () {
    let faturamento = [];
    let diario = {'total': 0};
    let currentMonth = (new Date()).getMonth();
    let total = 0;
    for (let i = 0; i < this.historico.length; i++) {
        if(this.historico[i].data.getMonth() === currentMonth) {
            total = total + (this.historico[i].reviews_da_data * (this.ItemAttributes.ListPrice.Amount / 100));
        }
    }
    return total;
});

ProdutoAmazonSchema.virtual('virtual.faturamento.mes.corrente.OLD').get(function () {
    let faturamento = [];
    let diario = {'total': 0};
    let monthCount = 0;
    let total = 0;
    let currentMonth = this.historico[0].data.getMonth();
    for (let i = 0; i < this.historico.length; i++) {
        if(this.historico[i].data.getMonth() === currentMonth) {
            diario.mes = currentMonth;
            diario.total = diario.total + (this.historico[i].reviews_da_data * this.ItemAttributes.ListPrice.Amount);
            if(i === this.historico.length - 1) {
                faturamento.push(diario);
            }
        } else {
            faturamento.push(diario);
            currentMonth = this.historico[i].data.getMonth();
            diario.mes = currentMonth;
            diario.total = this.historico[i].reviews_da_data;
        }
    }
    return faturamento[0];
});

function dayDiff(firstDate, secondDate) {
    return Math.round((secondDate - firstDate) / (1000 * 60 * 60 * 24));
}


mongoose.model('ProdutoAmazon', ProdutoAmazonSchema);