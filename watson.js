var express = require('express');
var router = express.Router();
var watson = require('watson-developer-cloud');
var toSendBack;

var tone_analyzer = watson.tone_analyzer({
    username: "d2e5af13-2ac6-4860-8066-ad1f77d2b252",
    password: "EbHk45QRU0xv",
    version: 'v3',
    version_date: '2016-05-19 '
});



// url: peer-mlh.com/watson/parse?id={the facebookId}
router.post('/parse', function (req, res) {
    tone_analyzer.tone({ text: commentBody },
    function(err, tone) {
        if (err)
          console.log(err);
        else {
           console.log(tone);
        }
    });
   
    res.send(users);
});

module.exports = router;