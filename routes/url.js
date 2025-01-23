const express=require('express');

const { GenerateNewShortUrl,getURL,deleteRequest,getAnalytics }=require('../controllers/url');

const router=express.Router();

router.post('/',GenerateNewShortUrl);


router.get('/analytics/:shortId',getAnalytics);
router.route('/:shortId')
    .get(getURL)
    .delete(deleteRequest)


module.exports= router;
