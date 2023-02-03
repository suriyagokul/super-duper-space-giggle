import nodemailer from "nodemailer";
import Mailgen from 'mailgen';


// import smtpTransport from "nodemailer-smtp-transport";

import ENV from "../config.js";

// const nodemailer = require("nodemailer");

export const registerMail = async (req, res) => {
  const {username, userEmail, text, subject} = req.body;

  // create a transporter object to send the email
  let transporter = nodemailer.createTransport({
    service:"gmail",
    debug: true,
    logger: true,
    auth: {
      user: "suryapeddinti946@gmail.com",
      pass: "fognzpeuylabaafu",
    },
  });

  
let MailGenerator = new Mailgen({
  theme: "default",
  product : {
      name: "Mailgen",
      link: 'https://mailgen.js/'
  }
})

var email = {
  body : {
      name: username,
      intro : text || 'Welcome to Daily Tuition! We\'re very excited to have you on board.',
      outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
  }
}
var emailBody = MailGenerator.generate(email);

  console.log(subject,text);
  // define the email options
  let mailOptions = {
    from: "suryapeddinti946@gmail.com",
    to: "suryapeddinti946@gmail.com",
    subject: subject || "Signup Successful",
    html: emailBody
    // <html>
    // <body>
    //   <h1>Welcome to D2D Healthcare</h1>
    //   <p>Dear ${username},</p>
    //   <p>We are thrilled to welcome you to D2D Healthcare! We are committed to providing you with top-notch healthcare services and support.</p>
    //   <p>As a registered user, you now have access to a wide range of healthcare services and resources, including online consultations with our experienced healthcare professionals, personalized health plans, and the ability to schedule appointments and manage your healthcare needs online.</p>
    //   <p>To get started, please log in to your account at <a href="{{websiteLink}}">{{websiteLink}}</a>. Here you can update your personal information, schedule appointments, and access your health records.</p>
    //   <p>If you have any questions or concerns, please don't hesitate to reach out to our customer support team at <a href="mailto:d2dhealthcare@gmail.com">{{supportEmail}}</a> or call at {{supportPhone}}. We are here to help and support you every step of the way.</p>
    //   <p>We look forward to helping you achieve optimal health and wellness.</p>
    //   <p>Best regards,<br>
    // The D2D Healthcare Team</p>
    // </body>
    // </html>
    // `
  };

  // send the email
  transporter.sendMail(mailOptions).then(()=>{
    return res.status(200).send({msg:"You should receive an email from us."})
  }).catch(error=>res.status(500).send({error}))
};
