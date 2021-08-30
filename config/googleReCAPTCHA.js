const fetch = require("node-fetch");

module.exports = async (token) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  //validatingHuman
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
      {
        method: "post",
      }
    );
    const data = await response.json();
    const isHuman = data.success;
    if (isHuman) return { isHuman: true, ok: true };
    else return { isHuman: false, ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false };
  }
};
