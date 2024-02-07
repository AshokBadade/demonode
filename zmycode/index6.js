const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;


const  app = express(); 

app.use(express.json())


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/NodeJS');
  console.log("database conneted")
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const kittySchema = new Schema({
  name: String
});

const Kitten = mongoose.model('Kitten',kittySchema );

const silence = new Kitten({ name: 'Silence' });
 silence.save();

 const cat1 = new Kitten({name:"pearl"}) ;
 cat1.save()

 const cat2= new Kitten({name:"rupali"}) ;
 cat2.save() ;

 const arr = Kitten.find({name:"ashok"}) ;
 //console.log(arr);


 const productSchema = new Schema({
  id: Number,
  title: String,
  price: Number,
  rating:  Number,
  stock: Number
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
  "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
 })

// p1.save()

 app.get("/",async(req,res) => {
  try{
    const docs = await Products.find({}) ;
    res.json(docs);
  }
  catch(err){  res.status(400).json(err)  } 
   
 } )
 

 const breakfastSchema = new Schema({
  eggs: {
    type: Number,
    min: [6, 'Too few eggs'],
    max: 12
  },
  bacon: {
    type: Number,
    required: [true, 'Why no bacon?']
  },
  drink: {
    type: String,
    enum: ['Coffee', 'Tea'],
    required: function() {
      return this.bacon > 3;
    }
  }
});

const Breakfast = mongoose.model('Breakfast', breakfastSchema);

const badBreakfast = new Breakfast({
  eggs: 2,
  bacon: 0,
  drink: 'Milk'
});






 app.post("/" ,(req,res) => {
    const p = new Products(req.body) ;
    p.save() ;
    res.send("data added") ;
 })

//  app.get("/p" , async(req,res) => {
//   const docs = await Products.find({id:2}) ;
//   res.json(docs)
//  })

 app.get("/:id" , async(req,res) => {
  const id = req.params.id ;
  const docs = await Products.findById(id) ;
   res.json(docs)
   console.log( "docs = "+docs) ;
 })

 app.put("/:id" , async(req,res) => {
  const id = req.params.id ;
  try{
    const docs = await Products.findOneAndUpdate({_id:id}, req.body ,{new:true}) ;
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


app.delete("/:id" , async(req,res) => {
  const id = req.params.id ;
  try{
    const docs = await Products.deleteMany({id:id}) ; 
    res.json(docs)
  }catch(err){ res.status(400).json(err) }
 })


app.listen(3002);
