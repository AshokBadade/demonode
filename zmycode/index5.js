const express = require('express');
const router1 = require('../routes/router1')
const router2 = require('../routes/router2')


const  app = express(); 

app.use(express.json())


app.use( "/",router1.router);
app.use("/users",router2) ;

app.listen(3002);
