var express = require('express');
var router = express.Router();
var watson = require('watson-developer-cloud');

var tone_analyzer = watson.tone_analyzer({
    username: "d2e5af13-2ac6-4860-8066-ad1f77d2b252",
    password: "EbHk45QRU0xv",
    version: 'v3',
    version_date: '2016-05-19 '
});


// url: peer-mlh.com/watson/search?text={the text}
router.get('/search', function (req, res) {
    console.log(req.query.text);

    tone_analyzer.tone({ text: req.query.text },
        function (err, tone) {
            if (err)
                console.log(err);
            else
                res.send(JSON.stringify(tone, null, 2));
        });
});

module.exports = router;