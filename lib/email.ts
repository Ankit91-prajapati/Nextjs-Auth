import "dotenv/config"
import nodemailer from "nodemailer"
const FROM_EMAIL = "ankitpro2070@gmail.com"

export async function sendEmail({ to, subject, text, html }: { to: string; subject: string; text?: string; html?: string }) {
  // if (RESEND_KEY) {
  //   const { Resend } = await import("resend");
  //   const resend = new Resend(RESEND_KEY);
  //   await resend.emails.send({ from: FROM_EMAIL, to, subject, text, html });
  //   return;
  // }

  const transporter = nodemailer.createTransport({
    host: process.env.BREVO_HOST,
    port: Number(process.env.BREVO_PORT),
    secure: false,
    auth: { user: process.env.BREVO_USER, pass: process.env.BREVO_PASS },
  });

  await transporter.sendMail({ from: FROM_EMAIL, to, subject, text, html });
}