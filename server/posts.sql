DROP DATABASE IF EXISTS wisely_test;
CREATE DATABASE wisely_test;
USE wisely_test;

CREATE TABLE posts (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(255),
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME,
  `isDone` BOOLEAN,
  `refId` JSON,
  PRIMARY KEY(id)
);

INSERT  INTO `posts`(`id`, `content`, `createdAt`, `updatedAt`, `isDone`, `refId`) values (1, '테스트 포스트 입니다.', '2022-05-19', NULL, false, NULL);