const Contact = require("../models/Contact");
const sendEmail = require("../config/nodemailer"); //nodemailer
const emailTemplates = require("../config/emailTemplates");

module.exports.contact = async (req, res) => {
  const { name, email, description } = req.body;
  if (!name || !email || !description)
    return res.status(404).json({ message: "Fill All Inputs", ok: false });

  try {
    const newContact = await new Contact({
      name,
      email,
      description,
    });
    await newContact.save();
    await sendEmail(
      process.env.adminEmail,
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
