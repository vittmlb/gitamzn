/**
 * Created by Vittorio on 28/09/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VistasSchema = new Schema({
    criada_em: {
        type: Date,
        default: Date.now
    },
    nome_vista: {
        type: String,
        trim: true,
        required: true
    },
    descricao_vista: {
        type: String,
        trim: true
    },
    produtos_vista: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'ProdutoML'
    }]
});

mongoose.model('Vista', VistasSchema);