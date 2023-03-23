#初始化指南
+ 安装nodejs，mysql
+ 为nodejs安装mysql库
+ 在mysql中创建数据库：IssuesBoard
+ 在mysql数据库IssuesBoard中添加数据表：
```SQL
CREATE TABLE Issues(id INT UNSIGNED AUTO_INCREMENT,issue LONGTEXT NOT NULL,PRIMARY KEY (id))ENGINE=InnoDB DEFAULT CHARSET=utf8;
```