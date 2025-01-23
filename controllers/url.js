const express = require('express');
const shortid = require('short-id');
const Url = require('../models/url');
const { format } = require('date-fns');

async function GenerateNewShortUrl(req, res) {
    try {
        const body = req.body;
        if (!body.url) {
            return res.status(400).json({ error: 'URL is required' });
        }
        const shortID = shortid.generate();

        await Url.create({
            shortId: shortID,
            redirectUrl: body.url,
            visitHistory: [],
        });

        return res.render('home', { id: shortID });
    } catch (error) {
        console.error("Error generating short URL:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


async function getURL(req,res){
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
    if(!entry){
        return res.status(404).json({ error: 'Short URL not found' });
    }
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
    getURL,
    getAnalytics,
    deleteRequest,
}