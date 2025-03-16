import nodemailer from 'nodemailer';
import envConfig from '../config/env.config';
import { loadTemplate } from "../emails/email.templates";
import { logger } from '../utils/logger.utils';

const { smtp: smtpEnv } = envConfig;

export const sendMail = async (from: string, to: string, subject: string, templateName: string, variables: Record<string, any>) => {

  const transporter = nodemailer.createTransport({
    host: smtpEnv.host,
    port: smtpEnv.port,
    auth: {
      user: smtpEnv.user,
      pass: smtpEnv.password
    }
  });

  const htmlContent = loadTemplate(templateName, variables);

  const mailOptions = { from: from, to: to, subject: subject, html: htmlContent };
  
  transporter.sendMail(mailOptions, (error, info)=> {
    const errorText = error ? error : 'Email sent: ' + info.response;
    logger.warn(errorText);
  });

}