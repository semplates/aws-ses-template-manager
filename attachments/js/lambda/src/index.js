import * as aws from "@aws-sdk/client-ses";
import { SESClient } from "@aws-sdk/client-ses";
import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import { getTemplate, sendEmail } from "./ses_utils.js";

const region = process.env.AWS_REGION;
const sesClient = new SESClient({region});


const transporter = nodemailer.createTransport({
  SES: {ses: sesClient, aws}
});

export const lambdaHandler = async (event) => {
  try {
    const {
      sender,
      receiver,
      templateName,
      variables,
      fileName,
      fileUrlOrPath
    } = event;

    const {Template: sesTemplate} = await getTemplate(sesClient, templateName);
    const template = Handlebars.compile(sesTemplate.HtmlPart);
    const htmlContent = template(variables);

    let attachments = undefined;
    if (fileUrlOrPath) {
      attachments = [{
        filename: fileName,
        path: fileUrlOrPath.startsWith('http') ? fileUrlOrPath : `./${fileUrlOrPath}`
      }];
    }

    return await sendEmail(
      transporter,
      receiver,
      sender,
      sesTemplate.SubjectPart,
      htmlContent,
      attachments
    );

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "An error occurred", error: error.message })
    };
  }
};