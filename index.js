const express = require('express');
const cors = require('cors');
const port =  process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
require('dotenv').config();


// middleware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yo6nkgd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
   try{
     await client.connect();
     const productCollection = client.db("emaJohn").collection("product");
     
     app.get('/product', async (req,res)=>{
        const query = { };
        const cursor = productCollection.find(query);
        const products = await cursor.toArray();
        res.send(products); 
        // res.send('hello anser are cleared !! '); 
     })
    }finally{
    // 
   }   

}
run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send('emajohn is running currently')
})

app.listen(port,()=>{
    console.log('ema john is currently listening ')
})