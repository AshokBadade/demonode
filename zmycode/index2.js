const express = require('express');


const  app = express(); 

const obj = {
    id:1,
    name:"laptop",
    price:63000,
}

app.use(express.json())
app.use(express.static("public")) ;   //find will in public folder 

const myLogger = (req, res, next) => {
    console.log("Logged in");
    next();
}

app.use(myLogger) ;

app.get("/", (req, res) => {
    res.send("<h1>hello world</h1>") ;
})

app.get("/obj", (req, res) => {
    res.send(obj) ;
})


app.listen(3002);
