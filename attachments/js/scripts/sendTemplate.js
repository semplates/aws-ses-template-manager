import * as aws from "@aws-sdk/client-ses";
import { SESClient } from "@aws-sdk/client-ses";

import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import { getTemplate, sendEmail } from "./ses_utils.js";

const sesClient = new SESClient();

const transporter = nodemailer.createTransport({
  SES: {ses: sesClient, aws}
});

const run = async (sender, recipient, templateName) => {
  try {
    const {Template} = await getTemplate(sesClient, templateName);
    const template = Handlebars.compile(Template.HtmlPart);
    const htmlContent = template({USER_NAME: "Jon Doe"});

    // Below are different ways of attaching documents
    const attachments = [
      {
        filename: 'attachment.txt',
        content: 'Hello, this is the content of the attachment.',
      },
      {
        path: '../assets/dummy.pdf'
      },
      {
        filename: 'license.txt',
        path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
      },
    ];

    await sendEmail(transporter, recipient, sender, Template.SubjectPart, htmlContent, attachments);
    console.log('Email sent successfully.');
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
};

const main = () => {
  const sender = "<sender-email-address>"; // replace with the verified sender email
  const recipient = "<recipient-email-address>" // replace with the recipient
  const templateName = 'TestTemplateName'; // Specify your template name

  run(sender, recipient, templateName)
}

main()