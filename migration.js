var mysql_dao = require('./db/mysql_dao');
var migration = require('node-mysql-migration');

migration.migrate(mysql_dao.get_connection(), __dirname + '/migrations');