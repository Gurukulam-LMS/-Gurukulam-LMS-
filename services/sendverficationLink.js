const sgMail = require("@sendgrid/mail");
const api_key = require("../config/config");
sgMail.setApiKey(api_key.Sendgrid);

exports.sendverficationLink = (email, otp) => {
  console.log(email, otp);
  const msg = {
    from: "ashu972040@gmail.com",
    to: email,
    subject: "OTP Verification",
    text: "Welcome to cousera ",
    html: `<h4 style="display:inline-block" >Please Verify your account using this OTP:</h4>
					<p style=" width:fit-content;letter-spacing:0.8px;color:#14213d; background-color: #f8edeb; border: 3px dashed orange; padding:10px 15px ; font-size:20px; font-weight:700;">${otp}</p>`,
  };

  sgMail.send(msg).then(
    () => {
      console.log(msg);
      console.log("mail sent");
    },
    (error) => {
      console.log(msg);
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};
