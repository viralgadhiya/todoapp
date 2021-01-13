const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
require('./config/env.config');
const port =  process.env.port || 2000;
 
app.use(cors());
app.use(bodyParser.urlencoded({  }));
  app.use(bodyParser.json({ }));
  require('./config/db');
require('./server/route')(app);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));