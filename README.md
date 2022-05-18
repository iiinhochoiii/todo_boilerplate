- mysql 실행 명령어

```js
mysql.server start
```

- mysql 스키마 실행 명령어 (.sql 파일에 작성되어있는 쿼리를 로컬 db에 실행하여 테이블 생성과 샘플 데이터를 추가)

```js
npm run migrate
```

- mysql을 사용하도록 터미널에 다음과 같이 입력하면 mysql 명령어를 사용할 수 있음

```js
mysql -u root -p
```

### 로컬 DB (mysql) 명령어

- show databases;  -> 데이터베이스 확인
- show tables; -> 테이블 확인
- SHOW FULL COLUMNS FROM posts; -> posts 테이블 컬럼 확인
- use wisely_test;   -> wisely_test 라는 db를 사용한다.
- drop databases wisely_test; -> wisely_test db를 삭제
- 나머지는 쿼리


### 외부 접속이 허용되었는지 확인
```
mysql > select host, user from mysql.user;
```

위와같이 host에 localhost 이외의 주소가 없다면 외부 접속 허용이 불가능함

MySQL에서 % 는 와일드 카드로 사용된다.
서버와 같은 외부에서 허용하도록 하려면 host주소에 %로 지정해주면 된다.

```sql
# MySQL8부터는 이렇게...
mysql> CREATE USER 'root'@'%' IDENTIFIED BY 'root';
Query OK, 0 rows affected (0.01 sec)

mysql> GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
Query OK, 0 rows affected (0.00 sec)

mysql> FLUSH PRIVILEGES;
Query OK, 0 rows affected (0.00 sec)
```

추가로...

MySQL 8.0에서는 MySQL 패스워드 플러그인 "caching_sha2_password" 때문에 클라이언트 프로그램에서 종종 지금과 같은 에러가 발생한다.

다음과 같이 SQL 문으로 자신의 데이터베이스의 패스워드 플러그인을 확인할 수 있다.

```sql
mysql> select host, user, plugin, authentication_string from mysql.user; 
```

그리고 "mysql_native_password" 플러그인으로 바꿔주면 정상 작동할 것이다.

```sql
mysql> ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';
```