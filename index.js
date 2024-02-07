const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Schema } = mongoose;


const  app = express(); 

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200 
};

app.use(express.json())
app.use(cors(corsOptions));

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://ASHOK:ASHOK@cluster0.ysj5m5f.mongodb.net/Ecommerce?retryWrites=true&w=majority');
  console.log("database conneted")
}



 const productSchema = new Schema({
  "id": {
    "type": "number"
  },
  "title": {
    "type": "string"
  },
  "description": {
    "type": "string"
  },
  "price": {
    "type": "number"
  },
  "discountPercentage": {
    "type": "number"
  },
  "rating": {
    "type": "number"
  },
  "stock": {
    "type": "number"
  },
  "brand": {
    "type": "string"
  },
  "category": {
    "type": "string"
  },
  "thumbnail": {
    "type": "string"
  }

      
 }) ;

 const Products = new mongoose.model("Products",productSchema) ;

 const p1 = new Products( {
    "id": 1,
    "title": "iPhone 9",
    "description": "An apple mobile which is nothing like apple",
    "price": 549,
    "discountPercentage": 12.96,
    "rating": 4.69,
    "stock": 94,
    "brand": "Apple",
    "category": "smartphones",
    "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
    
 })

 //p1.save()

 app.get("/get",cors(corsOptions),async(req,res) => {
  try{
    const docs = await Products.find() ;
    res.json(docs);
  }
  catch(err){  res.status(400).json(err)  } 
   
 } )
 



 app.post("/data" ,(req,res) => {
    const p = new Products(req.body) ;
    p.save() ;
    res.send("data added") ;
 })


//  app.get("/p" , async(req,res) => {
//   const docs = await Products.find({id:2}) ;
//   res.json(docs)
//  })

//  app.get("/:id" , async(req,res) => {
//   const id = req.params.id ;
//   const docs = await Products.findById(id) ;
//    res.json(docs)
//    console.log( "docs = "+docs) ;
//  })

 app.put("/:id" , async(req,res) => {
  const id = req.params.id ;
  try{
    const docs = await Products.findOneAndUpdate({title:id}, req.body ,{new:true}) ;
    res.json(docs)
  }catch(err){ res.status(400).json(err) }
 })


//  app.delete("/:id" , async(req,res) => {
//   const id = req.params.id ;
//   try{
//     const docs = await Products.findOneAndDelete({id:id}) ;
//     res.json(docs)
//   }catch(err){ res.status(400).json(err) }
//  })


app.delete("/del" , async(req,res) => {
  const id = req.body.title ;
  try{
    const docs = await Products.deleteMany({title:id}) ; 
    res.json(docs)
  }catch(err){ res.status(400).json(err) }
 })


app.listen(3002);
