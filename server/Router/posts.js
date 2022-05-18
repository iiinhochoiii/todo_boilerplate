const express = require('express');
const db = require('../config/database');

const router = express.Router();

router.get('/', (req, res) => {
    db.query(`SELECT * FROM posts`, (err, result) => {
        if(err) {
            throw error
        }
        res.status(200).json(result)
    })
})
 
module.exports = router;