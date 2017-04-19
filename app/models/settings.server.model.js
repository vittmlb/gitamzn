/**
 * Created by Vittorio on 13/04/2017.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let SettingsSchema = new Schema({
    amazon: {
        opHelper: {
            awsId: {
                type: String,
                trim: true,
                required: `O campo 'amazon.opHelper.awsId' é obrigatório`
            },
            awsSecret: {
                type: String,
                trim: true,
                required: `O campo 'amazon.opHelper.awsSecret' é obrigatório`
            },
            assocId: {
                type: String,
                trim: true,
                required: `O campo 'amazon.opHelper.assocId' é obrigatório`
            }
        }
    }
});

mongoose.model('Setting', SettingsSchema);