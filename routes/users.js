var express = require('express');
var router = express.Router();

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

module.exports = router;
