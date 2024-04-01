import { GetTemplateCommand } from "@aws-sdk/client-ses";

/**
 * Fetches an email template from AWS Simple Email Service (SES) by template name.
 *
 * @param {SESClient} sesClient - An instantiated SES client from the AWS SDK. This client
 *                                is used to interact with the AWS SES service.
 * @param {string} templateName - The name of the template to fetch. This is the identifier
 *                                for the email template stored in AWS SES.
 *
 * @returns {Promise<object>} - A promise that resolves to the template object. The template
 *                              object includes all the details of the template, such as the
 *                              name, subject part, text part, and HTML part.
 */
export const getTemplate = async (sesClient, templateName) => {
  const input = {
    TemplateName: templateName,
  };
  const command = new GetTemplateCommand(input);
  return sesClient.send(command);
};

/**
 * Sends an email using Nodemailer with the specified options.
 *
 * @param {Transporter} transporter - A Nodemailer transporter instance configured to send
 *                                    email through a specific email service, such as AWS SES.
 * @param {string} to - The recipient's email address.
 * @param {string} from - The sender's email address.
 * @param {string} subject - The subject line of the email.
 * @param {string} html - The HTML content of the email body.
 * @param {Array<object>} attachments - An array of attachment objects. Each object must
 *                                      contain properties as defined by Nodemailer for
 *                                      attachments.
 *
 * @returns {Promise<object>} - A promise that resolves to the result of the email send
 *                              operation. This result typically includes details of the
 *                              email transmission.
 */
export const sendEmail = async (transporter, to, from, subject, html, attachments) => {
  const mailOptions = {
    from,
    to,
    subject,
    html,
    attachments,
  };

  return transporter.sendMail(mailOptions);
};
