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

var users = [];
var offenses = []
function offense(score, body) //Holds offense message bodies and a number of offenses. This object is only to be used with person.
    {
        this.score = score;
        this.body = body;
    }
function person(name,id,offense)
    {
        this.name = name;
        this.id = id;
        this.offenses = [];
        this.offensesCount = 0;
        this.posts = [];

        this.getId = function() {
            return id;
        }

        this.getName = function() {
            return name;
        }

        this.addOffense = function(score, body) {
            this.offenses.push(new offense(score, body));
            this.offensesCount++;
        }

        this.getOffensesCounter = function() {
            return this.offense.counter;
        }

        this.getOffenses = function() {
            return offenses;
        }
    }

function searchUsers(id){
    var found = -1;

    for (i = 0; i < users.length; i++) {
        if(user.getId() === id) {
            found = i;
            break;
        }
    }

    return found;
}


// url: peer-mlh.com/watson/parse?id={the facebookId}
router.post('/parse', function (req, res) {
    
    var posts = req.body.result['posts']['data'];

    var thisComment, authorId, authorName, commentBody;

    for (i = 0; i < posts.length; i++) { //I'M USING INCONSISTENT LOOPS BECAUSE THEY'RE DUMB

        for (k = 0; k < posts[i]['comments']['data'].length; k++) {

            //ask watson about individual comments
            comment = posts[i]['comments']['data'][k];
            authorId = comment['from']['id'];
            authorName = comment['from']['name'];

            commentBody = comment['message'];

            tone_analyzer.tone({ text: commentBody },
              function(err, tone) {
                if (err)
                  console.log(err);
                else {
                    toSendBack = tone['document_tone']['tone_categories'][0]['tones'];
                    var score = toSendBack[0]['score'] * toSendBack[1]['score'];

                    if (score > .7) {
                        var index = searchUsers(authorId);
                        if (index != -1) {
                            var newOffense = new offense(score, commentBody);
                            var newUser = new person(authorName, authorId, newOffense)
                            users.push[newUser]
                        } else {
                            users[index].addOffense(score, commentBody);
                        }
                    }

                    
              }
            });


            
        }
    }   
    res.send(users);
});

module.exports = router;