// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
const formData = require('form-data');
  const Mailgun = require('mailgun.js');
  const mailgun = new Mailgun(formData);
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private mailgun=mailgun

  constructor(private readonly configService: ConfigService) {
  }

  async sendVerificationEmail(email: string,token:string) {
    const mg = this.mailgun.client({
      username: 'api',
      key: this.configService.get<string>('MAILGUN_API_KEY'),
    });

    try {
      const msg = await mg.messages.create('sandboxa31b185d35754a89aaea47215ca85a2e.mailgun.org', {
        from: 'Nityananda Toshiba C50 <mailgun@sandboxa31b185d35754a89aaea47215ca85a2e.mailgun.org>',
        to:["nnadkbdhupguri@gmail.com"],
        subject:"Hello NityaNanda",
        text:"Testing Mailgun usin NestJS!",
        html:  `
        <div>
            <h1>Congratulations!</h1>
            <br/>
            <p>This mail was sent from NestJS Application</p>
            <b>This is your token:</b>
            <p>${token}</p>
            <br/>
        </div>
    `
      });
      console.log('Message sent:', msg);
      return msg;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
