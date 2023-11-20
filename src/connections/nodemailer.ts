const nodemailer = require("nodemailer");

interface EmailAuth {
  user: string;
  pass: string;
}

interface EmailTransporter {
  host: string;
  port: number;
  auth: EmailAuth;
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST as string,
  port: Number(process.env.EMAIL_PORT),
  auth: {
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASS as string,
  },
} as EmailTransporter);

export default transporter;
