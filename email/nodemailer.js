import nodemailer from "nodemailer";
import { htmlCode } from "./html.js";
import jwt from "jsonwebtoken";

export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.email,
      pass: process.env.emailpass,
    },
  });

  let token = jwt.sign({ email: options.email }, process.env.JWT_KEY);
  const info = await transporter.sendMail({
    from: `"My Love" <${process.env.email}>`, // sender address
    to: options.email, // list of receivers
    subject: "Welcome 💘", // Subject line
    html: htmlCode(`http://localhost:4000/verify/${token}`), // html body
  });

  console.log("Message sent: %s", info.messageId);
};
