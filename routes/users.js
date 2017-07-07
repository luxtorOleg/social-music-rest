let express = require('express');
let router = express.Router();
let mysql_dao = require('../db/mysql_dao');
let respose_factory = require('../utils/response_factory');
let http_codes = require('../utils/http_codes');

const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

/* GET users list ing. */
router.get('/', function(req, res) {
  axios.get(`${API}/posts`)
      .then(posts => {
          res
              .status(200)
              .json(posts.data)
      })
      .catch(error => {
        res.status(500).send(error);
      })
});

router.put('/', function(req, res){
    "use strict";

    // this body should be accepted from request
    let user = req.body;

    let connection = mysql_dao.get_connection();

    connection.query(
        'INSERT INTO users SET ?',
        user,
        function(error, result){
            if (error) {
                if (error.code === 'ER_DUP_ENTRY') {
                    respose_factory.response(res, {
                        code: http_codes.CONFLICT,
                        message: 'such email already exists'
                    });
                } else {
                    respose_factory.response(res, { }); //empty error means internal service error
                }
            } else {
                respose_factory.response(res, null, result.insertId); // id of new added row
            }
        }
    );
});

module.exports = router;
