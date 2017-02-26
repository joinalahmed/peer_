var userIdToSearch = "walmart"; //ID of the user who's profile we're searching

src = "//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js";

var socket = io('13.65.42.183:3000');


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
						$(document).ready(function(){

							$.post("http://13.65.42.183:80/watson/parse", { result: response})
						})
											  		
				  }
				);
			}

			testAPI();


		} else {
			alert('Login failed.');
			console.log("FAILED");
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

