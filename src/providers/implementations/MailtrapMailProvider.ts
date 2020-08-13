import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from 'nodemailer'
import Mail from "nodemailer/lib/mailer";

export class MailtrapMailProvider implements IMailProvider{
  private transporter: Mail;
  constructor(){
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT),
      auth:{
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      },
      tls:{
        ciphers:process.env.TLS
      }
    }) 
  }
  async sendEmail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      from:{
        name: message.from.name,
        address: message.from.email
      },
      to:{
        name: message.to.name,
        address: message.to.email
      },
      subject: message.subject,
      html: message.body
    })
  }

}