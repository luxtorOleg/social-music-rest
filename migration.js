var mysql_dao = require('./db/mysql_dao');
var migration = require('mysql-migrations');

migration.init(mysql_dao.get_connection(), __dirname + '/migrations');