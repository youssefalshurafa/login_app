import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

import ENV from '../config.js';

// https:ethereal.email/create
let nodeConfig = {
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: ENV.EMAIL, // generated ethereal user
    pass: ENV.PASSWORD, // generated ethereal password
  },
};

let transporter = nodemailer.createTransport(nodeConfig);

let Mailgenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Mailgen',
    link: 'https://mailgen.js',
  },
});
/* POST: http://localhost:8080/api/registerMail
* @param : {
    "username" : "example123",
    "userEmail" : "admin123@gmail.com",
    "text": "",
    "subject": ""
}
*/
export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  // body of the email
  var email = {
    body: {
      name: username,
      intro: text || 'Welcome to our mail',
      outro: 'Need Help , reply to Us',
    },
  };

  var emailBody = Mailgenerator.generate(email);

  let message = {
    from: ENV.EMAIL,
    to: userEmail,
    subject: subject || 'singup successfull',
    html: emailBody,
  };
  // send mail
  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .send({ msg: ' you should recieve an email from us' });
    })
    .catch((error) => res.status(500).send({ error }));
};
