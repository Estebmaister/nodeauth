// Proof of concept for mail ------- ///
const config = require("./config.js");
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
const sendMail = async () => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: config.EMAIL_USER, // testAccount.user generated ethereal user
      pass: config.EMAIL_PASSWORD, // testAccount.pass generated ethereal password
    },
  });

  // Check the connection to the service.
  transporter.verify((error, success) => {
    if (error) return console.log(error);
    console.log("Server is ready to take our messages:", success);
  });

  // send mail with defined transport object
  const email = {
    from: `"Esteban Camargo NODE SERVER" <${config.EMAIL_USER}>`, // sender address

    to: `${"estebmaister@gmail.com"}`, // list of receivers

    subject: "Password recuperation ✔", // Subject line

    text: `We have received a solicitude to reestablish your password in our server, 
          for establish another password you can access this link ${"link"}\n
          If you didn't make this solicitude, you can delete this message.`, // plain text body

    html: `<b>We have received a solicitude to reestablish your password in our server, 
          for establish another password you can access this link ${"link"}\n
          If you didn't make this solicitude, you can delete this message.</b>`, // html body
  };
  let info = await transporter
    .sendMail(email)
    .catch((err) => console.log("Error sending message:", err));

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

module.exports = sendMail; // mail().catch(console.error);
// End proof of concept for mail --- ///
