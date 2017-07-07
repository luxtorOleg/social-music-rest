let mysql = require('mysql');

module.exports.get_connection = function() {
    "use strict";

    return mysql.createPool({
        connectionLimit : 10,
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'social_music'
    });
};
