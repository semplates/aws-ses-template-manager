
# README for SES Email Utility

This README documents the setup and usage for two Node.js scripts designed to work with Amazon Simple Email Service (SES) for email operations, including uploading an email template to SES and sending an email using a template.

## Overview

- `templateUploader.js`: This script uploads an HTML email template to Amazon SES, allowing it to be used for future email dispatches.
- `emailSender.js`: Utilizes a specified template from SES to send an email, allowing for custom data interpolation and attachment inclusion.

Both scripts rely on the AWS SDK for JavaScript and other dependencies like `nodemailer` and `handlebars` for email sending and template handling.

## Prerequisites

- Node.js installed on your system.
- An AWS account with SES set up, including verified email addresses for sending.
- AWS credentials (Access Key ID and Secret Access Key) configured for programmatic access.

## Configuration

1. **AWS Credentials**: Ensure your AWS credentials are configured. This can usually be done by setting up the `~/.aws/credentials` file or using environment variables as follows:

```sh
export AWS_ACCESS_KEY_ID=your_access_key_id_here
export AWS_SECRET_ACCESS_KEY=your_secret_access_key_here
```

2. **Installation**: Navigate to your project's root directory and run `npm install` to install the required dependencies, including `@aws-sdk/client-ses`, `nodemailer`, and `handlebars`.

## Usage

### Uploading an Email Template to SES

1. **Prepare the Template**: Ensure your HTML template file is ready. The default path in the script is `../../assets/registration.html`.

2. **Run the Script**: Execute the script from the command line:

```sh
node templateUploader.js
```

This will upload the HTML email template to Amazon SES, making it available for sending emails.

### Sending an Email Using a Template

1. **Customize the Call**: Modify `main` function in `emailSender.js` to include your sender and recipient email addresses and the template name you wish to use.

```javascript
const main = () => {
  const sender = "<sender-email-address>"; // Replace with your verified sender email
  const recipient = "<recipient-email-address>"; // Replace with your recipient
  const templateName = 'YourTemplateName'; // Specify the SES template name
  run(sender, recipient, templateName);
}
```

2. **Run the Script**: Execute the script from the command line:

```sh
node emailSender.js
```

The script will fetch the specified template, interpolate given data (`USER_NAME` in this case), attach documents if specified, and send the email to the recipient.

## Dependencies

These scripts depend on several NPM packages:

- `@aws-sdk/client-ses` for AWS SES operations.
- `nodemailer` for sending emails.
- `handlebars` for template handling and interpolation.

Ensure all dependencies are installed by running `npm install` in your project directory.

## Notes

- Ensure that the email addresses used (sender and recipient) are verified in Amazon SES in the region you're operating if you are in the SES sandbox environment.
- These scripts are configured for basic use cases. You may need to modify them to suit your specific requirements, such as customizing email content or handling attachments differently.
- It is crucial to handle AWS credentials securely and not expose them in your codebase.

By following these instructions, you should be able to upload email templates to Amazon SES and send templated emails programmatically.
