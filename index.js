const express = require('express');
// const bodyParser = require('body-parser');
const os = require ('os');
const app = express();

// app.use(bodyParser);

app.get('/', (req, res) => {
    res.send('OK');
});

app.get('/api/v1/health/:service', (req, res) => {
    res.send('asdasd')
  const service = req.query.service;
  const status = isAlive(service);
  res.send(imagify(status));
});

app.get('/api/v1/availability/:service', (req, res) => {
    res.send("error")
});

isAlive = service => {
// FIXME: add proper cmd
 return os.exec(`docker ps | grep ${service}`) === "" ? false : true; 
}

imagify = status => {
  throw new Error('Method is not implemented');
}

app.listen(process.env.NODE_PORT || 6767, () => console.log('Listening on 6767'));