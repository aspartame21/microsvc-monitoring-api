const express = require('express');
const http = require('http');
const app = express();

const LABEL_SELECTOR = "com.docker.compose.service";

app.get('/api/v1/healthz/:service', async (req, res) => {
  const service = req.params.service;
  const badge = req.query.badge;
  res.setHeader('X-Powered-By', 'Nijat');
  getService(service, container => {
    container = JSON.parse(container);
    const state = container.length !== 0 ? container[0].State : "N/A";
    if (typeof badge === "undefined") {
      res.append('Content-Type', 'application/json');
      res.send({ name: service, state });
      return;
    }
    state === "running" ? res.redirect(badgify(service, state, 'brightgreen')) : res.redirect(badgify(service, state, 'red'));
  });
});

app.listen(process.env.NODE_PORT || 6767, () => console.log('Listening on 6767'));

function badgify(label, message, color) {
  return `https://img.shields.io/badge/${label.replaceAll('-', '--')}-${message.replaceAll('-', '--')}-${color}.svg`;
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
