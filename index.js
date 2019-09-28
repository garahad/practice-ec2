const express = require('express');
const bodyParser = require('body-parser');

const sourceRouter = require('./routes/source');
const dataRouter = require('./routes/data');

const app = express();

app.use(express.static('dist'));
app.use(bodyParser.text());
// todo express.static이 뭔지도 잘. dist ?
// todo 클라이언트를 8080에 띄운거면 server는 몇번에 띄운거지?
// todo index.html만 띄우면 다른 것은 안 딸려와서 잘 안뜨는 군.

app.use('/api/source', sourceRouter);
app.use('/api/data', dataRouter);

app.listen(8080, () => console.log('Listening on port 8080!'));

module.exports = app;
