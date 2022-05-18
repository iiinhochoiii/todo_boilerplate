const express = require('express');
const db = require('../config/database');
const dayjs = require('dayjs');

const router = express.Router();

router.get('/', (req, res) => {
    db.query(`SELECT * FROM posts`, (err, result) => {
        if(err) {
            res.status(400).send({err: err, msg: '데이터를 불러오는 중 오류가 발생하였습니다.'})
            return;
        }
        res.status(200).json(result)
    })
})
 
router.post('/', (req,res) => {
    const {content} = req.body;

    if(!content) {
        res.status(400).send({msg: '내용을 입력해주세요.'});
        return;
    }
    db.query(`INSERT INTO posts (content, createdAt, isDone) 
    VALUES ('${content}', '${dayjs().format('YYYY-MM-DD HH:mm:ss')}', '${0}' )`, (err, result) => {
        if(err) {
            res.status(400).send({err: err, msg: '데이터를 추가하는 중 오류가 발생하였습니다.'})
            return;
        }
        res.status(200).json(result)
    });
})

router.delete('/:id', (req,res) => {
    const {id} = req.params;

    if(!id) {
        res.status(400).send({msg: 'id가 전달되지 않았습니다.'});
        return;
    } 

    db.query(`DELETE FROM posts WHERE id = ${id}`, (err, result) => {
        if(err || result.affectedRows === 0) {
            res.status(400).send({msg: '데이터를 삭제하는 중 오류가 발생하였습니다.'});
            return;
        }
        res.status(200).json(result)
    })
    
});
module.exports = router;