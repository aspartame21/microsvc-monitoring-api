const express = require('express');
const http = require('http');
const app = express();

// app.use(bodyParser);

http.request({ socketPath: '/var/run/docker.sock', path: '/v1.24/containers/json' }, res => {
  console.log(`STATUS: ${res.statusCode}`);
  res.setEncoding('utf-8');
  res.on('data', data => console.log(JSON.parse(data)[0]));
  res.on('err', err => console.log(err));
}).end();

// const ls = spawn('ls', ['-lh', '/usr']);

// ls.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// ls.stderr.on('data', (data) => {
//   console.log(`stderr: ${data}`);
// });

// ls.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });

app.get('/', (req, res) => {
  res.send('OK');
});
app.get('/api/v1/health/:service', async (req, res) => {
  const service = req.params.service;
  const status = await isAlive(service);
  res.send(status);
});

app.get('/api/v1/availability/:service', (req, res) => {
  res.send("error")
});



isAlive = async service => {
  return execSync(`docker ps | grep ${service}`, { stdio: "ignore" }).toString("utf-8")// === "" ? false : true;
}

imagify = status => {
  throw new Error('Method is not implemented');
}

app.listen(process.env.NODE_PORT || 6767, () => console.log('Listening on 6767'));