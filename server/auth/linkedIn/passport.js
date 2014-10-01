exports.setup = function (User, config) {
  var passport = require('passport');
  var LinkedInStrategy = require('passport-linkedin').Strategy;

    passport.use(new LinkedInStrategy({
      consumerKey: config.linkedin.clientID,
      consumerSecret: config.linkedin.clientSecret,
      callbackURL: config.linkedin.callbackURL
    },
    function(token, tokenSecret, profile, done) {
      User.findOne({
        'linkedin.id': profile.id
      }, function(err, user) {
        console.log("err line15 ", err);
        if(err) {
          return done(err);
        }
        if(!user) {
          user = new User({
            name: profile.displayName,
            role: 'user',
            provider: 'linkedin',
            linkedin: profile._json
          });
          user.save(function(err) {
            console.log("err line 26 ", err);
            if(err) return done(err);
            return done(err, user);
          });
        } else {
          return done(err, user);
        }
      });
    })
  );
};