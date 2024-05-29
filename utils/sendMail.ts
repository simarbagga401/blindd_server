const nodemailer = require("nodemailer");

export const sendMail = async (match_email,user) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: {
        name:'Blinddd',
        address:process.env.SENDER_EMAIL
    }, // sender address
    to: `${match_email}`, // list of receivers
    subject: `New Match Found On Blinddd `, // Subject line
    text: `You are matched with ${user} on Blinddd dating app`, // plain text body
  });
};
