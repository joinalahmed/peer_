/*jshint asi:true*/
var userIdToSearch = "walmart"; //ID of the user who's profile we're searching

src = "//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js";

var users = [];
var offenses = [];
function offense(score, body) { //Holds offense message bodies and a number of offenses. This object is only to be used with person.
    this.score = score;
    this.body = body;
}
function person(name,id,offense) {
    this.name = name;
    this.id = id;
    this.offenses = [];
    this.offensesCount = 0;
    this.posts = [];

    this.getId = function() {
        return id;
    };

    this.getName = function() {
        return name;
    };

    this.addOffense = function(score, body) {
        this.offenses.push(new offense(score, body));
        this.offensesCount++;
    };

    this.getOffensesCounter = function() {
        return this.offense.counter;
    };

    this.getOffenses = function() {
        return offenses;
    };
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

/*logInWithFacebook = function() {
	FB.login(function(response) {
		if (response.authResponse) {
			// Now logged in
			var accessToken = response.authResponse.accessToken;
			
			FB.api(
				'/' + userIdToSearch,
				'GET',
				{"fields":"posts{comments{created_time,from,message}}"},
				function(response) {
					var toSend_preObjectCreation = [];

					var posts = response.posts.data;

				    var thisComment, authorId, authorName, commentBody;

				    for (i = 0; i < posts.length; i++) {

				        for (k = 0; k < posts[i].comments.data.length; k++) {

				            // The for loops above isolate each comment object. Below I've isolated the 
				            // fields from each comment.
				            comment = posts[i].comments.data[k];
				            authorId = comment.from.id;
				            authorName = comment.from.name;

				            commentBody = comment.message;


				            //TODO: Organize comments by person and send them as an object

				            
				            toSend_preObjectCreation.push(commentBody); //For testing, I'm just putting every
				        }												//comment in an array
				        
				    }

				    var toSend = {
				    	messages: toSend_preObjectCreation 	//To agree with JSON format, I'm putting the comments
				    										//in an object. Works perfectly. Not sure if this 
				    										//is how it's supposed to be done. Fight me.
				    }
				    console.log(toSend);
				    $(document).ready(function(){	 //Probably not necessary to check for document completion.

		            		$.post('watson/parse', toSend, function(data, status) { 
		            			console.log(data);	 //Data is the server response. 
		            		})
		            	}
		            );									  		
				}
			);
		} else {
			alert('Login failed.');
		}
	});
	return false;
};*/

//Uncomment the block below and comment out the other logInWithFaceworm to skip Facebook login and scraping
// particularly if you want to use a local server to test.


logInWithFacebook = function() { 		//FB login won't work from localhost with this method,
	$(document).ready(function(){		//so I'm circumventing login and just sending hardcoded text to server
			var toSend = "The server was walking around going ching chong ching chong ding ling pong";

			$.post('watson/parse', toSend , function(data, status) {
				console.log(data);

			})
		}
	);
}


//This function initializies FB *after* the sdk is loaded.
window.fbAsyncInit = function() {
	FB.init({
		appId: '165008204006667',
		cookie: true, // This is important, it's not enabled by default
		version: 'v2.8'
	});

};

//This anonymous function loads the facebook SDK. It's just copy-pasted from the Facebook documentation.
(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "https://connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

