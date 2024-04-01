import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();


const createSesClientWithKeyPair = (awsAccessKeyId, awsSecretAccessKey, awsRegion) =>
  new AWS.SES({
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretAccessKey,
    region: awsRegion
  });

const getAwsClients = () => {
  const clientSource = createSesClientWithKeyPair(
    process.env.SOURCE_AWS_ACCESS_KEY_ID,
    process.env.SOURCE_AWS_SECRET_ACCESS_KEY,
    process.env.SOURCE_AWS_REGION
  );

  const clientTarget = createSesClientWithKeyPair(
    process.env.TARGET_AWS_ACCESS_KEY_ID,
    process.env.TARGET_AWS_SECRET_ACCESS_KEY,
    process.env.TARGET_AWS_REGION
  );

  return {clientSource, clientTarget};
};

const listTemplates = async (client) => {
  let templateNames = [];
  try {
    const paginator = await client.listTemplates().promise();
    paginator.TemplatesMetadata.forEach(template => {
      templateNames.push(template.Name);
    });
  } catch (error) {
    console.error("Error listing templates:", error);
  }
  return templateNames;
};

const getTemplate = async (client, templateName) => {
  try {
    const response = await client.getTemplate({TemplateName: templateName}).promise();
    return response.Template;
  } catch (error) {
    console.error(`Error getting template ${templateName}:`, error);
  }
};

const copyTemplates = async (sourceClient, targetClient) => {
  const templates = await listTemplates(sourceClient);
  for (const templateName of templates) {
    const template = await getTemplate(sourceClient, templateName);
    try {
      await targetClient.createTemplate({Template: template}).promise();
      console.log(`Copied template: ${templateName}`);
    } catch (error) {
      if (error.code === 'AlreadyExists') {
        console.log(`Template ${templateName} already exists in target account. Skipping...`);
        continue;
      }
      throw error;
    }
  }
};

const main = async () => {
  try {
    const {clientSource, clientTarget} = getAwsClients();
    await copyTemplates(clientSource, clientTarget);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

main();

