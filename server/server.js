const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const posts = require('./Router/posts');


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/posts', posts)

const port = 8080;
app.listen(port, () => console.log(`open express! port: ${port}`));