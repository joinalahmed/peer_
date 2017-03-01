var express = require('express');
var router = express.Router();
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var path = require('path');
var FacebookTokenStrategy = require('passport-facebook-token');
var pug = require('pug');


passport.use(new Strategy({
	clientID: '165008204006667',
	clientSecret: '0f725ad8b39da0a2f612b1620c2f11c7',
    callbackURL: 'http://www.peer-mlh.com/auth/facebook/callback'
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


//router.set('views', path.join(__dirname, 'views'));
//router.set('view engine', 'pug');

router.use(passport.initialize());
router.use(passport.session());



/* GET home page. */
router.get('/', function (req, res) {
    res.sendFile('./index_.html', { root: __dirname });
});

// Once authenticated, Facebook API will reroute to /auth/facebook/callback
router.get('/auth/facebook', 
	passport.authenticate('facebook')
	);

router.get('/auth/facebook/callback',
	passport.authenticate('facebook', { failureRedirect: '/'}),
    function (req, res) {
		res.redirect('/result');
	});

router.get('/about', function (req, res) {
    res.sendFile('./about.html', { root: __dirname });
});


router.get('/result', 
	function(req, res) {
        res.sendfile('./result.html', { root: __dirname })
	});

module.exports = router;
