const express = require('express');
const fs = require('fs');

const  app = express(); 

const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const products = data.products;

app.use(express.json())

app.get("/",(req,res) => {
    res.send("Welcome") ;
})

const getProducts = (req, res) =>{
    res.json(products) ;
}

const getProduct = (req, res) =>{
    const id = +req.params.id ;
    const product = products.find(product => product.id === id)
    res.json(product) ;
}

const addProduct = (req, res) =>{
    console.log(req.body);
    products.push(req.body);
    res.json(req.body);
}

const removeProduct = (req, res) =>{
    const id = +req.params.id ;
    const indx = products.findIndex(product => product.id === id);
    products.splice(indx, 1);
}

const updateProduct = (req, res) =>{
    const id = +req.params.id ;
    const indx = products.findIndex(product => product.id === id);
    products[indx]={...req.body, id: id} ;
    res.json(products[indx]); ;
}

const patchProduct = (req, res) =>{
    const id = +req.params.id ;
    const indx = products.findIndex(product => product.id === id);
    const product = products[indx] ;
    products[indx]={...product,...req.body} ;
    res.json(products[indx]); ;
}

const router1 = express.Router()

 router1
.get("/products", getProducts)
.get("/products/:id",getProduct)
.post("/products",addProduct)
.put("/products/:id", updateProduct)
.patch("/products/:id", patchProduct)
.delete("/products/:id",removeProduct)

exports.router1=router1 ;
