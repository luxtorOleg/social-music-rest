let express = require('express');
let router = express.Router();
let mysql_dao = require('../db/mysql_dao');
let response_factory = require('../utils/response_factory');
let http_codes = require('../utils/http_codes');

let POSSIBLE_FIELDS_FOR_USER_PUT = ['email', 'password', 'name'];

/**
 * get list of users
 *
 * possible query params:
 *      - fields - list on fields to return
 */
router.get('/', function(req, res) {
    "use strict";

    let fields = req.query.fields || 'id,name,email';

    let connection = mysql_dao.get_connection();

    connection.query('SELECT ' + fields + ' FROM users', function(error, result){
        if (error) {
            if (error.code === 'ER_BAD_FIELD_ERROR') {
                response_factory.response(res, {
                    code: http_codes.BAD_REQUEST,
                    message: 'No such field'
                });
            } else {
                response_factory.response(res, { }); //empty error means internal service error
            }
        } else {
            response_factory.response(res, null, result);
        }
    });

    connection.end();
});


/**
 * create new user in db
 * required fiends is {email, password, name}
 */
router.put('/', function(req, res){
    "use strict";

    // this body should be accepted from request
    let user = req.body;

    // remove all not required properties
    for (let key in user) {
        if (user.hasOwnProperty(key)) {
            if (!user[key] || POSSIBLE_FIELDS_FOR_USER_PUT.indexOf(key) < 0) {
                delete user[key];
            }
        }
    }

    if (!user.email) {
        response_factory.response(res, {
            code: http_codes.BAD_REQUEST,
            message: 'email is required'
        });

        return;
    } else if (!user.password) {
        response_factory.response(res, {
            code: http_codes.BAD_REQUEST,
            message: 'password is required'
        });

        return;
    }

    let connection = mysql_dao.get_connection();

    connection.query(
        'INSERT INTO users SET ?',
        user,
        function(error, result){
            if (error) {
                if (error.code === 'ER_DUP_ENTRY') {
                    response_factory.response(res, {
                        code: http_codes.CONFLICT,
                        message: 'such email already exists'
                    });
                } else {
                    response_factory.response(res, { }); //empty error means internal service error
                }
            } else {
                response_factory.response(res, null, result.insertId); // id of new added row
            }
        }
    );

    connection.end();
});

module.exports = router;
