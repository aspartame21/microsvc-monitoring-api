const http = require('http');

const LABEL_SELECTOR = "com.docker.compose.service";

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
exports.getService = getService;
