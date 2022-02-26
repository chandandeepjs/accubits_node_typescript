import * as nodemailer from 'nodemailer';
import * as striptags from 'striptags';
import { Response } from 'express';
import * as ejs from 'ejs';
import * as fs from 'fs';
import { ENV_VARIABLE }from '../../constant/response';

class MailHelper {
   public appObject: Response;

   private mailerObj: nodemailer.Transporter;

   constructor() {
      this.mailerObj = this.mailConn();
   }

   public sendMail(
      sendTo: string,
      subjectLine: string,
      textLine: string,
      template: string
      // res: any = ''
   ) {
      return new Promise((resolve) => {
         this.appObject.render(
            template,
            {
               subject: subjectLine,
               message: textLine,
            },
            (err: Error, htmlview: string) => {
               console.log(err);
               try {
                  this.mailerObj.sendMail({
                     from:ENV_VARIABLE.SMTP_FROM, // sender address
                     to: sendTo, // list of receivers
                     cc:ENV_VARIABLE.CC_EMAIL,
                     subject: subjectLine, // Subject line
                     text: striptags(htmlview), // plain text body
                     html: htmlview, // html body
                  });
                  resolve(true);
               } catch (e) {
                  console.log('Errors under email', e);
                  resolve(false);
               }
            }
         );
      });
   }

   public sendEmail(sendTo: string, subjectLine: string, textLine: string) {
      console.log('Here Email', sendTo, subjectLine);
      try {
         this.mailerObj.sendMail({
            from:ENV_VARIABLE.SMTP_FROM, // sender address
            to: sendTo, // list of receivers
            cc:ENV_VARIABLE.CC_EMAIL,
            subject: subjectLine, // Subject line
            text: striptags(textLine), // plain text body
            html: this.emailHtmlParser(textLine, subjectLine), // html body
         });
      } catch (e) {
         console.log('Errors under sendEMail', e);
      }
   }

   private mailConn() {
      const hostName: string =ENV_VARIABLE.SMTP_HOST;
      const transporter = nodemailer.createTransport({
         host: hostName, // 'smtp.ethereal.email',
         port: 587,
         secure: false, // true for 465, false for other ports
         auth: {
            user:ENV_VARIABLE.SMTP_USER, // generated ethereal user
            pass:ENV_VARIABLE.SMTP_PASSWORD, // generated ethereal password
         },
      });
      return transporter;
   }

   private emailHtmlParser(emailContent: string, emailTitle: string) {
      // eslint-disable-next-line
      const str: string = fs.readFileSync(
         __dirname + '/../../views/common.ejs',
         'utf8'
      );
      const messageHtml = ejs.render(str, {
         message: emailContent,
         email_title: emailTitle,
         project_name:ENV_VARIABLE.PROJECT_NAME,
      });
      return messageHtml;
   }
}
export default new MailHelper();
