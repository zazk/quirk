const http = require('http');
const url = require('url');
const hostname = '127.0.0.1';
const port = 3000;
const QRCode = require('qrcode');

const server = http.createServer(function(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('QR Generator\n');
  const url_parts = url.parse(req.url, true);
  const query = url_parts.query;
  if (query.q) {
    console.log('Generating QR Code: ', query, `./${query.q}.png`); //{Object}
    QRCode.toFile(`./files/${query.q}.png`, query.q, {}, function(err) {
      console.log('Done');
      if (err) throw err;
      console.log('File', query.q);
    });
  }
});
server.listen(port, hostname, function() {
  console.log('Server running at http://' + hostname + ':' + port + '/');
});
