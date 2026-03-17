import "dotenv/config"
import nodemailer from "nodemailer"


export async function sendEmail({ to, subject, text, html }: { to: string; subject: string; text?: string; html?: string }) {
  

  const transporter = nodemailer.createTransport({
    host: process.env.BREVO_HOST,
    port: Number(process.env.BREVO_PORT),
    secure: false,
    auth: { user: process.env.BREVO_USER, pass: process.env.BREVO_PASS },
  });

  await transporter.sendMail({ from:process.env.FROM_EMAIL, to, subject, text, html });
}