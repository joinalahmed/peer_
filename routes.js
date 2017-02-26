var express = require('express');
var router = express.Router();
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

passport.use(new Strategy({
	clientID: '165008204006667',
	clientSecret: '0f725ad8b39da0a2f612b1620c2f11c7',
	callbackURL: ''
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


router.use(passport.initialize());
router.use(passport.session());



/* GET home page. */
router.get('/', function (req, res) {
    res.sendFile('./public/index_.html', { root: __dirname });
});

router.get('/getstarted', 
	passport.authenticate('facebook')
	);

router.get('/getstarted/return', 
	passport.authenticate('facebook', { failureRedirect: '/'}),
	function(req, res) {
		res.redirect('/getstarted/home');
	});

router.get('/about', function (req, res) {
    res.sendFile('./public/about.html', { root: __dirname });
});

router.get('/getstarted/home', 
	require('connect-ensure-login').ensureLoggedIn(),
	function(req, res) {
		res.render('home', { user: req.user });
	});

module.exports = router;
