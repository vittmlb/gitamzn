/**
 * Created by Vittorio on 12/05/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VendedorMLSchema = new Schema({
    id: {
        type: String,
        required: 'O campo id é obrigatório',
        unique: false
    },
    nickname: {
        type: String
    },
    registration_date: {
        type: Date
    },
    country_id: {
        type: String
    },
    address: {
        state: {
            type: String
        },
        city: {
            type: String
        }
    },
    user_type: {
        type: String
    },
    tags: [String],
    points: {
        type: Number,
        default: -1
    },
    site_id: {
        type: String
    },
    permalink: {
        type: String
    },
    seller_reputation: {
        level_id: {
            type: String
        },
        power_seller_status: {
            type: String
        },
        transactions: {
            period: {
                type: String
            },
            total: {
                type: Number,
                default: -1
            },
            completed: {
                type: Number,
                default: -1
            },
            canceled: {
                type: Number
            },
            ratings: {
                positive: {
                    type: Number
                },
                negative: {
                    type: Number
                },
                neutral: {
                    type: Number
                }
            }
        }
    }
});

mongoose.model('VendedorML', VendedorMLSchema);