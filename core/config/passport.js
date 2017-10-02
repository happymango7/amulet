import { db } from './../db';
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('./config')

module.exports = function(passport) {
	const opts = {}
	opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
	opts.secretOrKey = config.secret;
	passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
		const user = db.get('users').find({'id': jwt_payload.id}).value();

		if(user) {
			done(null, user);
		} else {
			done(null, false);
		}
	}));
};