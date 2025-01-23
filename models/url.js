const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String, required: true, unique: true
    }, redirectUrl: {
        type: String, required: true, unique:true
    }, totalClicks: {
        type: Number, default: 0
    }, visitHistory: [{timestamp: {type: Number}}],
}, {timestamps: true});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;