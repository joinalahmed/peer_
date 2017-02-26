var express = require('express');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

passport.use(new Strategy({
	clientID: '165008204006667',
	clientSecret: '0f725ad8b39da0a2f612b1620c2f11c7',
	callbackURL: '/auth/return'
}, 
function(accessToken, refreshToken, profile, cb) {
	return cb(null, profile);
}));

passport.serializeUser(function(user, cb){
	cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
	cb(null, obj);
});

var app = express();

app.use(passport.initialize());
app.use(passport.session());

app.get('/', 
	function(req, res){
		res.sendFile('./index.html');
	});

app.get('/auth', 
	passport.authenticate('facebook')
	);

app.get('/auth/return', 
	passport.authenticate('facebook', { failureRedirect: '/'}),
	function(req, res) {
		res.redirect('/result');
	});

app.get('/result', 
	require('connect-ensure-login').ensureLoggedIn(),
	function(req, res) {
		res.render('result', { user: req.user });
	});

app.listen(3000);