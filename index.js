const express = require('express');
const http = require('http');
const app = express();

const LABEL_SELECTOR = "com.docker.compose.service";

app.get('/api/v1/health/:service', async (req, res) => {
  const service = req.params.service;
  getService(service, container => { 
    container = JSON.parse(container);
    const state = container.length !== 0 ? container[0].State : "N/A";
    state === "running" ? res.redirect(badgify(service, state, 'brightgreen')) : res.redirect(badgify(service, state, 'red'));
  });
});

app.listen(process.env.NODE_PORT || 6767, () => console.log('Listening on 6767'));

function badgify(label, message, color) {
  return `https://img.shields.io/badge/${label.replace('-','--')}-${message.replace('-','--')}-${color}.svg`;
}

function getService(service, cb) {
  http.request({
    socketPath: '/var/run/docker.sock',
    path: `/v1.24/containers/json?filters={"label":{"${LABEL_SELECTOR}=${service}":true}}`
  }, res => {
    res.setEncoding('utf-8');
    res.on('data', data => cb(data));
    res.on('err', err => cb(err));
  }).end();
}
