const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
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

        if (existingUser) return done(null, existingUser);

        //if user sign-in using local but first time signing in with gmail
        const localExistingUser = await User.findOneAndUpdate(
          {
            "local.personalInfo.email": profile.emails[0].value,
          },
          {
            $set: {
              google: {
                id: profile.id,
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
            personalInfo: {
              firstName: profile.displayName,
              email: profile.emails[0].value,
              password: uuid(),
            },
            verification: {
              email: true,
            },
          },
          google: {
            id: profile.id,
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

passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_OAUTH_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_OAUTH_CLIENT_SECRET,
      callbackURL: "/auth/linkedin/callback",
      scope: ["r_emailaddress", "r_liteprofile"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ "linkedin.id": profile.id });
        if (existingUser) return done(null, existingUser);

        //if user sign-in using local but first time signing in with linkedin
        const localExistingUser = await User.findOneAndUpdate(
          {
            "local.personalInfo.email": profile.emails[0].value,
          },
          {
            $set: {
              linkedin: {
                id: profile.id,
                token: accessToken,
              },
            },
          },
          { returnOriginal: false }
        );

        if (localExistingUser) return done(null, localExistingUser);

        //Sign-up google
        const newUser = new User({
          method: "linkedin",
          local: {
            personalInfo: {
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              email: profile.emails[0].value,
              password: uuid(),
            },
            verification: {
              email: true,
            },
          },
          linkedin: {
            id: profile.id,
            token: accessToken,
          },
        });
        await newUser.save();
        return done(null, newUser);
      } catch (err) {
        console.log(err.message);
        done(err, false, err.message);
      }
    }
  )
);
