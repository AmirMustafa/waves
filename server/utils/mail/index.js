const mailer = require("nodemailer");
require("dotenv").config();

const { welcome } = require("./welcome_template.js");
const { purchase } = require("./purchase_template.js");
const { resetPass } = require("./reset_password.js");

const getEmailData = (to, name, token, template, actionData) => {
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
    case "purchase":
      data = {
        from: "Waves <info.waves.dev@gmail.com>",
        to,
        subject: `Thanks for shopping with us ${name}`,
        html: purchase(actionData),
      };
      break;
    case "reset_password":
      data = {
        from: "Waves <info.waves.dev@gmail.com>",
        to,
        subject: `Hey ${name}, reset your password here`,
        html: resetPass(actionData),
      };
    default:
      data;
  }

  return data;
};

const sendEmail = (to, name, token, type, actionData = null) => {
  const smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: "info.waves.dev@gmail.com",
      pass: process.env.EMAIL_PASS,
    },
  });

  const mail = getEmailData(to, name, token, type, actionData);

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
