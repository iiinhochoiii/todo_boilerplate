const express = require('express');
const cors = require('cors');
const posts = require('./Router/posts');


const app = express();
app.use(cors());

app.use('/api/posts', posts)

const port = 3001;
app.listen(port, () => console.log(`open express! port: ${port}`));