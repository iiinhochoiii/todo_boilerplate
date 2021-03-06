const express = require('express');
const db = require('../config/database');
const dayjs = require('dayjs');

const router = express.Router();

// 조회
router.get('/', (req, res) => {
    const {page = 1, pageSize = 10, content, isDone, startAt, endAt} = req.query;

    const isDoneQuery = isDone ? `AND isDone = ${isDone}` : '';
    const dateQuery = startAt && endAt ? `AND DATE(createdAt) BETWEEN "${dayjs(startAt).format('YYYY-MM-DD')}" AND "${dayjs(endAt).format('YYYY-MM-DD')}"` : '';
    const pagingQuery = `LIMIT ${pageSize} OFFSET ${(page * pageSize) - pageSize}`;

    const sql = `
    SELECT *
    FROM posts 
    WHERE content LIKE "%${content||''}%" ${isDoneQuery} ${dateQuery}
    ORDER BY id DESC`;

    db.query(sql.replace('*', 'COUNT (*) AS total'), (err, result) => {
        if(err) {
            res.status(500).send({err: err, msg: '데이터를 불러오는 중 오류가 발생하였습니다.'});
            return;
        }
        const total = result[0].total;

        db.query(`${sql} ${pagingQuery}`, (err, result) => {
            if(err) {
                res.status(500).send({err: err, msg: '데이터를 불러오는 중 오류가 발생하였습니다.'});
                return;
            }
            res.status(200).json({rows: result, total: total})
        })
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
router.post('/isDone', (req, res) => {
    const {id} = req.body;

    if(!id) {
        res.status(400).send({msg: 'id 값이 없습니다.'});
        return;
    }

    db.query(`SELECT * FROM posts WHERE id = ${id}`, (err, result) => {
        if(err) {
            res.status(500).send({err: err, msg: '데이터를 불러오는 중 오류가 발생하였습니다.'});
            return;
        }
        const refId = result[0].refId;
        const isDone = result[0].isDone;

        if(isDone === 0) {
            db.query(`SELECT * FROM posts WHERE isDone = 0 AND id IN (${refId})`, (err, result) => {
                if(err) {
                    res.status(500).send({err: err, msg: '데이터를 불러오는 중 오류가 발생하였습니다.'});
                    return;
                }
                if(result.length === 0) {
                    db.query(`UPDATE posts SET isDone = 1 WHERE id = ${id}`, (err, result) => {
                        if(err || result.affectedRows === 0) {
                            res.status(500).send({msg: '데이터를 수정하는 중 오류가 발생하였습니다.'});
                            return;
                        }
                        res.status(200).json({status: true, isDone: 1, msg: '완료 처리 되었습니다.'});
                    });
                } else {
                    res.status(200).json({status: false, isDone: 0, msg: '참조 아이디 중 미완료 상태가 존재 합니다.'});
                }
            })
        } else {
            db.query(`UPDATE posts SET isDone = 0 WHERE id = ${id}`, (err, result) => {
                if(err || result.affectedRows === 0) {
                    res.status(500).send({msg: '데이터를 수정하는 중 오류가 발생하였습니다.'});
                    return;
                } else {
                    res.status(200).json({status: true, isDone: 0, msg: '미완료 처리 되었습니다.'});
                }
            })
        }
        
    })
});

router.get('/all', (req, res) => {
    const sql = `
        SELECT * FROM posts
    `;

    db.query(sql, (err, result) => {
       if(err) {
        res.status(500).send({err: err, msg: '데이터를 불러오는 중 오류가 발생하였습니다.'});
        return;
       }
       res.status(200).json({rows: result})
    })
})
module.exports = router;