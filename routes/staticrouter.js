const express=require('express');
const Url=require('../models/url');

const router=express.Router();

router.get("/view",async (req,res)=>{
    const allUrls=await Url.find({});
    return res.render("home",{
        urls:allUrls,
        id:Url.shortId,
    });
})
module.exports=router;