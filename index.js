const { getService } = require("./docker-sdk");
const { badgify } = require("./badgify");

const express = require('express');
const app = express();

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
    res.writeHead(200, {
      "Content-Type": "image/svg+xml"
    });
    state === "running"
      ? res.write(badgify(service, state, 'brightgreen'))
      : res.write(badgify(service, state, 'red'));
    res.end();
  });
});

app.listen(process.env.NODE_PORT || 6767, () => console.log('Listening on 6767'));