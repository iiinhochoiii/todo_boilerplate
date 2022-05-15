const express = require('express');
const app = express()
const test = require('./Router/test');

app.use('/api', test);

const port = 3001;
app.listen(port, () => console.log(`open express! port: ${port}}`));