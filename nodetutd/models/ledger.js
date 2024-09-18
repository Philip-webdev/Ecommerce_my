const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LedgerSchema = new Schema({
   
    ledger: {
        type: String,
        required: true
    }},
    { timestamps: true});

    const Ledger =  mongoose.model('Ledger', LedgerSchema);
    module.exports = Ledger;