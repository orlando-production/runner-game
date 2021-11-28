const express = require('express');

const app = express();
const path = require('path');

const router = express.Router();

app.use(express.static(path.join(__dirname, '/dist')));

router.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/index.html`));
});

app.use('/', router);
app.listen(process.env.PORT || 3000);
