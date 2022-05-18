const mysql = require('mysql2');

const db_info = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1234', // DB를 설치할때 사용자가 지정한 비밀번호로 저는 1234로 하였으며, 만약 로컬 db에 접속이 안되는 경우, 해당 비밀번호를 수정해주세요.
    database: 'wisely_test'
}

const connection = mysql.createConnection(db_info);
connection.connect();

module.exports = connection;