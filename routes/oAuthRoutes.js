const { Router } = require("express");
const passport = require("passport");

const router = Router();

//GOOGLE
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
//GOOGLE: Callback function after login
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  function (req, res) {
    let token = req.user._id;
    res.redirect(process.env.CLIENT_ORIGIN + "/auth/" + token);
  }
);

router.get(
  "/linkedin",
  passport.authenticate("linkedin", {
    scope: ["r_emailaddress", "r_liteprofile"],
  })
);

router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", { failureRedirect: "/", session: false }),
  (req, res) => {
    let token = req.user._id;
    res.redirect(process.env.CLIENT_ORIGIN + "/auth/" + token);
  }
);

module.exports = router;
