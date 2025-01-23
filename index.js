const express=require('express');
const Url=require('./models/url');
const {connectToMongo}=require('./connect');
const app=express();
const { format } = require('date-fns');
const PORT=3000;

const urlRoute=require('./routes/url');

connectToMongo("mongodb://127.0.0.1:27017/urlshortener")
    .then(()=>console.log('Connected to MongoDB'))
    .catch((err)=>console.log(err));

app.use(express.json());
app.use("/url",urlRoute);



app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)});