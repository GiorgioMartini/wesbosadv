import { createTransport, getTestMessageUrl } from "nodemailer";

const transporter = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeANiceEmail(text: string) {
  return `
  <div style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
  <h2>Hi</h2>
  <p>${text}</p>
  </div>
  `;
}

export async function sendPasswordResetEmail(resetToken: string, to: string) {
  const info = await transporter.sendMail({
    to,
    from: "text@example.com",
    subject: "pass token",
    html: makeANiceEmail(
      `Your pass token: <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click here</a>`
    ),
  });
  if (process.env.MAIL_USER.includes("ethereal.email")) {
    console.log(getTestMessageUrl(info));
  }
}
