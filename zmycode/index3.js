const express = require('express');
const fs = require('fs');

const  app = express(); 

const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const products = data.products;

app.use(express.json())

app.get("/",(req,res) => {
    res.send("Welcome") ;
})

app.get("/products", (req, res) => {
    res.json(products) ;
})

//read
app.get("/products/:id", (req, res) => {
    const id = +req.params.id ;
    const product = products.find(product => product.id === id)
    res.json(product) ;
})

//create
app.post("/products",(req, res) => {
    console.log(req.body);
    products.push(req.body);
    res.json(req.body);
})

//update
app.put("/products/:id", (req, res) => {
    const id = +req.params.id ;
    const indx = products.findIndex(product => product.id === id);
    products[indx]={...req.body, id: id} ;
    res.json(products[indx]); ;
})

//update add new property to the object
app.patch("/products/:id", (req, res) => {
    const id = +req.params.id ;
    const indx = products.findIndex(product => product.id === id);
    const product = products[indx] ;
    products[indx]={...product,...req.body} ;
    res.json(products[indx]); ;
})

//delete
app.delete("/products/:id", (req, res) => {
    const id = +req.params.id ;
    const indx = products.findIndex(product => product.id === id);
    products.splice(indx, 1);
})



app.listen(3002);
