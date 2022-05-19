const express = require('express');
const db = require('../config/database');
const dayjs = require('dayjs');

const router = express.Router();

// 조회
router.get('/', (req, res) => {
    const {page = 1, pageSize = 10, content, isDone, startAt, endAt} = req.query;

    const isDoneQuery = isDone ? `AND isDone = ${isDone}` : '';
    const dateQuery = startAt && endAt ? `AND DATE(createdAt) BETWEEN "${dayjs(startAt).format('YYYY-MM-DD')}" AND "${dayjs(endAt).format('YYYY-MM-DD')}"` : '';

    const sql = `
    SELECT *
    FROM posts 
    WHERE content LIKE "%${content||''}%" ${isDoneQuery} ${dateQuery}
    ORDER BY id DESC
    LIMIT ${pageSize} OFFSET ${(page * pageSize) - pageSize}`;

    db.query(sql, (err, result) => {
        if(err) {
            res.status(500).send({err: err, msg: '데이터를 불러오는 중 오류가 발생하였습니다.'});
            return;
        }
        res.status(200).json({rows: result, total: result.length})
    })

   

})
 
// 생성
router.post('/', (req,res) => {
    const {content} = req.body;

    if(!content) {
        res.status(400).send({msg: '내용을 입력해주세요.'});
        return;
    }
    db.query(`INSERT INTO posts (content, createdAt, isDone) 
    VALUES ('${content}', '${dayjs().format('YYYY-MM-DD HH:mm:ss')}', '${0}' )`, (err, result) => {
        if(err) {
            res.status(500).send({err: err, msg: '데이터를 추가하는 중 오류가 발생하였습니다.'});
            return;
        }
        res.status(200).json(result)
    });
})

// 삭제
router.delete('/:id', (req, res) => {
    const {id} = req.params;

    if(!id) {
        res.status(400).send({msg: 'id가 전달되지 않았습니다.'});
        return;
    } 

    db.query(`DELETE FROM posts WHERE id = ${id}`, (err, result) => {
        if(err || result.affectedRows === 0) {
            res.status(500).send({msg: '데이터를 삭제하는 중 오류가 발생하였습니다.'});
            return;
        }
        res.status(200).json(result);
    })
    
});

// 수정
router.post('/update', (req, res) => {
    const {id, content, refId} = req.body;

    if(!id) {
        res.status(400).send({msg: 'id가 없습니다.'});
        return;
    }

    const sql = `
        UPDATE posts SET content = ?, refId = ?, updatedAt = ? WHERE id = ${id}
    `;

    db.query(sql, [content, refId, dayjs().format('YYYY-MM-DD HH:mm:ss')], (err, result) => {
        if(err || result.affectedRows === 0) {
            res.status(500).send({msg: '데이터를 수정하는 중 오류가 발생하였습니다.'});
            return;
        }
        res.status(200).json(result);
    });
});

// 완료
router.patch('/isDone', (req, res) => {
    const {id, isDone} = req.query;

    if(!id || ['true', 'false'].includes(isDone) === false) {
        res.status(400).send({msg: 'id 또는 isDone 값이 없습니다.'});
        return;
    }

    const sql = `
        UPDATE posts SET isDone = ? WHERE id = ${id}
    `;

    db.query(sql, [isDone === 'true'], (err, result) => {
        if(err || result.affectedRows === 0) {
            res.status(500).send({msg: '데이터를 수정하는 중 오류가 발생하였습니다.'});
            return;
        }
        res.status(200).json(result);
    });
});

module.exports = router;