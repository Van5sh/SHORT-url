const express=require('express');
const Url=require('./models/url');
const path=require('path');
const {connectToMongo}=require('./connect');
const app=express();

const staticRouters=require('./routes/staticrouter');
const PORT=3000;

const urlRoute=require('./routes/url');

connectToMongo("mongodb://127.0.0.1:27017/urlshortener")
    .then(()=>console.log('Connected to MongoDB'))
    .catch((err)=>console.log(err));

app.get("/test",async (req,res)=>{
    const allUrls=await Url.find({});
    res.render('home',{
        urls:allUrls,
    });
});
app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/url",urlRoute);
app.use("/",staticRouters);

app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)});