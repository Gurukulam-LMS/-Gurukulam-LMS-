const Contact = require("../models/Contact");
const sendEmail = require("../config/nodemailer"); //nodemailer
const emailTemplates = require("../config/emailTemplates");
const verifyReCAPTCHA = require("../config/googleReCAPTCHA");

module.exports.contact = async (req, res) => {
  const { name, email, description, token } = req.body;
  if (!name || !email || !description)
    return res.status(404).json({ message: "Fill All Inputs", ok: false });

  //ReCAPTACH verification
  const verifyReCAPTCHA_token = await verifyReCAPTCHA(token);
  if (!verifyReCAPTCHA_token.ok || !verifyReCAPTCHA_token.isHuman)
    return res.json({
      message: "Google ReCAPTACH verification failed",
      ok: false,
    });

  try {
    const newContact = await new Contact({
      name,
      email,
      description,
    });
    await newContact.save();
    await sendEmail(
      process.env.MAIL_USER,
      emailTemplates.contactTempate(name, email, description)
    );
    return res.json({ message: "Saved!!", ok: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Message sending failed", ok: false });
  }
};
