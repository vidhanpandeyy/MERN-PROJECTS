const mongoose = require('mongoose');

const medical = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    description: {
        type: String,
    },
    disease: {
        type: String,
    },
    prescription:[],
}, { timestamps: true })

module.exports = mongoose.model("Medical", medical);