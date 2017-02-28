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

logInWithFacebook = function() { //
	FB.login(function(response) {
		if (response.authResponse) {
			console.log('You are logged in & cookie set!');
			var accessToken = response.authResponse.accessToken;
			// Now you can redirect the user or do an AJAX request to
			// a PHP script that grabs the signed request from the cookie
			function testAPI() {
				console.log('Welcome!  Fetching your information.... ');

				FB.api(
					'/' + userIdToSearch,
					'GET',
					{"fields":"posts{comments{created_time,from,message}}"},
					function(response) {
						//console.log(response);
						var toSend_preObjectCreation = [];

						var posts = response['posts']['data'];

					    var thisComment, authorId, authorName, commentBody;

					    for (i = 0; i < posts.length; i++) { //I'M USING INCONSISTENT LOOPS BECAUSE THEY'RE DUMB

					        for (k = 0; k < posts[i]['comments']['data'].length; k++) {

					            //ask watson about individual comments
					            comment = posts[i]['comments']['data'][k];
					            authorId = comment['from']['id'];
					            authorName = comment['from']['name'];

					            commentBody = comment['message'];

					            
					            toSend_preObjectCreation.push(commentBody); //For testing, I'm just putting every
					        }												//comment in an array
					        
					    }

					    var toSend = {
					    	messages: toSend_preObjectCreation 	//To agree with JSON format, I'm putting the comments
					    										//in an object. Works perfectly. Not sure if this 
					    										//is how it's supposed to be done. Fight me.
					    } 
					    console.log(toSend);
					    $(document).ready(function(){ //Probably not necessary but I'm just doing it to be sure

			            		$.post('watson/parse', toSend ,function(data, status) { 
			            			console.log(data); //Data is the server response. 
			            		})
			            	}
			            );
																	  		
					}
				);
			}

			testAPI();


		} else {
			alert('Login failed.');
		}
	});
	return false;
};


window.fbAsyncInit = function() {
	FB.init({
		appId: '165008204006667',
		cookie: true, // This is important, it's not enabled by default
		version: 'v2.8'
	});

};

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "https://connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

