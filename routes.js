var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.sendFile('./public/index_.html', { root: __dirname });
});


router.get('/about', function (req, res) {
    res.sendFile('./public/about.html', { root: __dirname });
});

module.exports = router;
