var express = require('express');
var router = express.Router();
var watson = require('watson-developer-cloud');

var tone_analyzer = watson.tone_analyzer({
    username: "d2e5af13-2ac6-4860-8066-ad1f77d2b252",
    password: "EbHk45QRU0xv",
    version: 'v3',
    version_date: '2016-05-19 '
});

 tone_analyzer.tone({ text: "text" },
        function (err, tone) {
            if (err)
                console.log(err);
            else
                res.send(JSON.stringify(tone, null, 2));
        });


// url: peer-mlh.com/watson/search?text={the text}
router.get('/parse', function (req, res) {
    




});

module.exports = router;