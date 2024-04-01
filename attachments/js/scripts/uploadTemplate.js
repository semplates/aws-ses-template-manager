import fs from 'fs/promises';
import { CreateTemplateCommand, SESClient } from "@aws-sdk/client-ses";

const TEMPLATE_NAME = "TestTemplateName"
const TEMPLATE_PATH = "../../assets/registration.html";
const SUBJECT_PART = "Welcome to Our Service!";

const client = new SESClient();

const readHtmlFile = async (filePath) => {
  try {
    return await fs.readFile(filePath, {encoding: 'utf-8'});
  } catch (err) {
    console.error(`Error reading file: ${err}`);
    return null;
  }
};

const uploadTemplateToSES = async (templateName, subject, htmlContent) => {
  const command = new CreateTemplateCommand({
    Template: {
      TemplateName: templateName,
      SubjectPart: subject,
      HtmlPart: htmlContent,
      TextPart: 'This is the text part of the email.'
    }
  });

  try {
    return await client.send(command);
  } catch (err) {
    console.error(`Failed to create template: ${err}`);
    return err;
  }
};

const run = async () => {
  try {
    const htmlContent = await readHtmlFile(TEMPLATE_PATH);
    if (htmlContent) {
      await uploadTemplateToSES(TEMPLATE_NAME, SUBJECT_PART, htmlContent);
    } else {
      console.log("Failed to read the HTML content. Cannot proceed with uploading the template.");
    }
  } catch (e) {
    console.error(`An error occurred: ${e}`);
  }
};

run();
