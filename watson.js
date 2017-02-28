var express = require('express');
var router = express.Router();
var watson = require('watson-developer-cloud');

var tone_analyzer = watson.tone_analyzer({
    username: "d2e5af13-2ac6-4860-8066-ad1f77d2b252",
    password: "EbHk45QRU0xv",
    version: 'v3',
    version_date: '2016-05-19 '
});

// url: peer-mlh.com/watson/parse?id={the facebookId}
// for testing url: peer-mlh.com/watson/parse?text=
// Method above is deprecated af. 

router.post('/parse', function(req,res){
    var received = req.body;
    //I commented out the Watson block below to speed up testing. Uncomment to use Watson
    /*
    tone_analyzer.tone({ text: req.body.text},  //Make sure that the object sent in the post request to Watson has a
                                                //text field, or rename the ".text" as appropriate.
      function(err, tone) {
        if (err)
            console.log(err);
        else {
            console.log(JSON.stringify(tone, null, 2));
            res.send(tone);

        }

    }); */
    res.send(req.body); //Sending back the same data for testing. Remove when watson is being used.
});


module.exports = router;