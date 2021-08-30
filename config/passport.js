const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const User = require("../models/User");
const { v1: uuid } = require("uuid");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

//passport template code
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          "google.id": profile.id,
        });

        if (existingUser) {
          return done(null, existingUser);
        }
        9;

        //Sign-in google
        const localExistingUser = await User.findOneAndUpdate(
          {
            "local.email": profile.emails[0].value,
          },
          {
            $set: {
              google: {
                id: profile.id,
                email: profile.emails[0].value,
                token: accessToken,
              },
            },
          },
          { returnOriginal: false }
        );

        if (localExistingUser) {
          return done(null, localExistingUser);
        }

        //Sign-up google
        const newUser = new User({
          method: "google",
          local: {
            userName: profile.displayName,
            email: profile.emails[0].value,
            password: uuid(),
            confirmed: true,
          },
          google: {
            id: profile.id,
            email: profile.emails[0].value,
            token: accessToken,
          },
        });
        await newUser.save();
        done(null, newUser);
      } catch (err) {
        console.log(err.message);
        done(err, false, err.message);
      }
    }
  )
);

// passport.use(new LinkedInStrategy({
//   clientID: process.env.LINKEDIN_OAUTH_CLIENT_ID,
//   clientSecret: process.env.LINKEDIN_OAUTH_CLIENT_SECRET,
//   callbackURL: "/auth/linkedin/callback",
//   scope: ['r_emailaddress', 'r_liteprofile'],
// }, async (token, tokenSecret, profile, done) => {
//     try{

//     }catch(err){
//       console.log(err.message);
//         done(err, false, err.message);
//     }
// }
// ));
