const mailer = require("nodemailer");
require("dotenv").config();
const { welcome } = require("./welcome_template.js");

const getEmailData = (to, name, token, template) => {
  let data = null;

  switch (template) {
    case "welcome":
      data = {
        from: "Waves <info.waves.dev@gmail.com>",
        to,
        subject: `Welcome to waves ${name}`,
        html: welcome(),
      };
      break;
    default:
      data;
  }

  return data;
};

const sendEmail = (to, name, token, type) => {
  const smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: "info.waves.dev@gmail.com",
      pass: process.env.EMAIL_PASS,
    },
  });

  const mail = getEmailData(to, name, token, type);

  smtpTransport.sendMail(mail, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log("email sent");
    }

    smtpTransport.close();
  });
};

module.exports = { sendEmail };
