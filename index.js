const http = require('http');
const fs = require('fs');

const port = 3002;

const data = {
  name : "ashok",
  tech : "java" ,
}

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', "text/html");
  res.end(JSON.stringify(data));

});
server.listen(port, () => {
  console.log(`Server running at http://${port}/`);
});

