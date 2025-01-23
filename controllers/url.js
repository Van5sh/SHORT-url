const express = require('express');
const shortid = require('short-id');
const Url = require('../models/url');

async function GenerateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({error: 'url is required'});
    }
    const shortID = shortid.generate();

    await Url.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
    })
    return res.json({id: shortID});
}

async function getURLS(req,res){
    const shortId=req.params.shortId;

    const entry=await Url.findOneAndUpdate({
            shortId,
        }, {
            $push: {
                visitHistory: {
                    timestamp: Number(format(Date.now(), 'yyyyMMdd')),
                },
            },
        }
    );
    res.redirect(entry.redirectUrl);
}


async function deleteRequest(req,res){
    const shortId = req.params.shortId;

    const response = await Url.findOneAndDelete({ shortId });

    if (!response) {
        return res.status(404).json({ error: "Short URL not found" }); // 404 Not Found
    }

    return res.status(204).send();
}

async function getAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await Url.findOne({shortId});
    return res.json({totalClicks: result.visitHistory.length,analytics: result.visitHistory});
};
module.exports = {
    GenerateNewShortUrl,
    getURLS,
    getAnalytics,
    deleteRequest,
}