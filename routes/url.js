const express=require('express');

const { GenerateNewShortUrl,getURLS,deleteRequest,getAnalytics }=require('../controllers/url');

const router=express.Router();

router.post('/',GenerateNewShortUrl);

router.get('/analytics/:shortId',getAnalytics);
router.route('/:shortId')
    .get(getURLS)
    .delete(deleteRequest)


module.exports= router;
