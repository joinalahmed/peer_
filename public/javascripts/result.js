var userIdToSearch = "100009081525475"; //ID of the user who's profile we're searching
src = "//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js";
var users = [];
var offenses = [];

/*function offense(score, body) {	//Holds offense message bodies and a number of offenses. This object is only to be used with person.
    this.score = score;				//Uncomment when/if top offenses are enabled
    this.body = body;
}*/

function Person(name, id) {
    this.name = name;
    this.id = id;
    //this.offenseCt = 0;			//Offense count. Not needed yet for testing with just averages
    //this.topOffense = [];    	//Uncomment when/if top offenses are enabled
    this.commentCt = 0;
    this.commentString = "";
    this.arithAvgScore = 0;
    this.quadAvgScore = 0;
    this.median = 0;
    this.calculateValues = function (scores, cnt) {
            this.arithAvgScore = (function (scoreList, cnt) {
                var sum = 0;
                for (var score in scoreList) {
                    sum += score;
                }
                return sum / cnt;
            })(scores, cnt);
        
            this.quadAvgScore = (function (scores, cnt) {
                var sum = 0;
                for (var score in scoreList) {
                    sum += Math.pow(score, 2);
                }
                return Math.sqrt(sum / cnt);
            })(scores, cnt);
        
            this.median = (function (scores, cnt) {
                scores.sort();
                if (cnt % 2 == 0) return (scores[cnt / 2 - 1] + scores[cnt / 2]) / 2;
                else return scores[(cnt - 1) / 2];
            })(scores, cnt);
        }
        /*this.totArithAvgScore = 0;*/
        /*	this.addArithAvgScore = function(commentCount, totalScore) {
                var newAvg = this.totScore + totalScore;
                newAvg /= commentCount + this.commentCt;

                this.arithAvgScore = newAvg;
                return newAvg;
            }*/
}

function searchUsers(id) {
    var found = -1;
    for (i = 0; i < users.length; i++) {
        if (users[i].getId() === id) {
            found = i;
            break;
        }
    }
    return found;
}

logInWithFacebook = function () {
    FB.login(function (response) {
        if (response.authResponse) {
            // Now logged in
            var accessToken = response.authResponse.accessToken;
            FB.api('/' + userIdToSearch, 'GET', {
                "fields": "posts{comments{created_time,from,message}}"
            }, function (response) {
                var toSend_preObjectCreation = [];
                var posts = response.posts.data;
                var thisComment, authorId, authorName, commentBody, commentCnt = 0
                    , commentString = "";
                for (i = 0; i < posts.length; i++) {
                    for (k = 0; k < posts[i].comments.data.length; k++) {
                        commentCnt++;
                        // The for loops above isolate each comment object. Below I've isolated the 
                        // fields from each comment.
                        comment = posts[i].comments.data[k];
                        authorId = comment.from.id;
                        authorName = comment.from.name;
                        commentBody = comment.message;
                        //TODO: Organize comments by person and send them as an object
                        var index = searchUsers(authorId);
                        if (index != -1) {
                            user[index].commentString += commentBody + " ";
                            user[index].commentCnt++;
                            console.log('User is in:', user[index]);
                        }
                        else {
                            var new_user = new Person(authorName, authorId);
                            new_user.commentString += commentBody;
                            users.push();
                            console.log('User not in:', authorId);
                        }
                        //TODO: Setup database for organization of data
                    }
                }
                console.log(users);
                for (user in users) {
                    var toSend = {
                            messages: user.commentString
                            //To agree with JSON format, I'm putting the comments
                            //in an object. Works perfectly. Not sure if this 
                            //is how it's supposed to be done. Fight me.
                        }
                        //Send to watson
                    $(document).ready(function () { //Probably not necessary to check for document completion.
                        $.post('watson/parse', toSend, function (data, status) {
                            console.log(data); //Data is the server response. 
                        })
                    });
                }
            });
        }
        else {
            alert('Login failed.');
        }
    });
    return false;
};

//Uncomment the block below and comment out the other logInWithFaceworm to skip Facebook login and scraping
// particularly if you want to use a local server to test.
/*
logInWithFacebook = function() { 		//FB login won't work from localhost with this method,
	$(document).ready(function(){		//so I'm circumventing login and just sending hardcoded text to server

			var toSend = a // JSON.stringify(a);

			$.post('watson/parse', toSend , function(data, status) {
				console.log(data);



			})
		}
	);
}
*/
//This function initializies FB *after* the sdk is loaded.
window.fbAsyncInit = function () {
    FB.init({
        appId: '165008204006667'
        , cookie: true, // This is important, it's not enabled by default
        version: 'v2.8'
    });
};
//This anonymous function loads the facebook SDK. It's just copy-pasted from the Facebook documentation.
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));