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

function callWatson(){
    tone_analyzer.tone({ text: "It's already December 23, 2016 and I have NOT received my shipment that was supposed to come the 22nd. I expect my $12 that I paid for expidited shipping back, since you obviously LIED about the arrival date! I checked the tracking and it says it'll come in the 27th, which is after Christmas and is RIDICULOUS because I PAID for EXPIDITED shipping and it did NOTHING. Now I have to tell my neice that I DON'T have a gift for her because WALMART LIED. Terrible company and terrible customer service. Target is 100x better than Walmart!" },
      function(err, tone) {
        if (err)
          console.log(err);
        else
          console.log(JSON.stringify(tone, null, 2));
    });

}

router.get('/parse', function(req,res){
    tone_analyzer.tone({ text: "It's already December 23, 2016 and I have NOT received my shipment that was supposed to come the 22nd. I expect my $12 that I paid for expidited shipping back, since you obviously LIED about the arrival date! I checked the tracking and it says it'll come in the 27th, which is after Christmas and is RIDICULOUS because I PAID for EXPIDITED shipping and it did NOTHING. Now I have to tell my neice that I DON'T have a gift for her because WALMART LIED. Terrible company and terrible customer service. Target is 100x better than Walmart!" },
      function(err, tone) {
        if (err)
          console.log(err);
        else
          console.log(JSON.stringify(tone, null, 2));
    });
})

/*
// url: peer-mlh.com/watson/parse?id={the facebookId}
router.get('/parse', function (req, res) {
    tone_analyzer.tone({ text: "It's already December 23, 2016 and I have NOT received my shipment that was supposed to come the 22nd. I expect my $12 that I paid for expidited shipping back, since you obviously LIED about the arrival date! I checked the tracking and it says it'll come in the 27th, which is after Christmas and is RIDICULOUS because I PAID for EXPIDITED shipping and it did NOTHING. Now I have to tell my neice that I DON'T have a gift for her because WALMART LIED. Terrible company and terrible customer service. Target is 100x better than Walmart!" },
    function(err, tone) {
        if (err)
          console.log(err);
        else {
           console.log(tone);
        }
    });
   
    res.send(users);
});
*/
module.exports = router;