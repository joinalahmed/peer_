var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/about', function (req, res, next) {
    res.sendfile('../public/about.html');
});

module.exports = router;
