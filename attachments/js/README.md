
# Project Structure Overview

This document provides an overview of the project's directory structure, highlighting the purpose of various components and directories. The project is structured to separate AWS Lambda functions and standalone scripts for working with Amazon Simple Email Service (SES).

## Directory Structure

- `lambda/`: Contains the source code and configuration for AWS Lambda functions.
    - `package.json`: Defines the npm package dependencies for the Lambda functions.
    - `src/`: Source directory for Lambda functions.
        - `index.js`: The entry point for the Lambda function execution.
        - `ses_utils.js`: Utility functions for interacting with AWS SES within the Lambda environment.
    - `tofu/`: (Placeholder for additional context or specifics related to its purpose)
    - `yarn.lock`: Yarn lock file to lock the versions of package dependencies.
- `scripts/`: Directory for standalone scripts that can be executed outside of AWS Lambda.
    - `README.md`: Provides instructions and information about the scripts within this directory.
    - `package.json`: Defines the npm package dependencies for the scripts.
    - `sendTemplate.js`: Script to send an email using a template from AWS SES.
    - `ses_utils.js`: Shared utility functions for interacting with AWS SES, used by the scripts.
    - `uploadTemplate.js`: Script to upload an email template to AWS SES.
    - `yarn.lock`: Yarn lock file to lock the versions of package dependencies.

## Resources for Further Reading

For more information on how to use Nodemailer with AWS SES and how to work with the AWS SES SDK for JavaScript, refer to the following resources:

- Nodemailer AWS SES Example: [GitHub - Nodemailer SES Example](https://github.com/nodemailer/nodemailer/blob/master/examples/ses.js)
- Nodemailer SES Transport: [Nodemailer - SES Transport](https://nodemailer.com/transports/ses/)
- AWS SES SDK v3 `GetEmailTemplateCommand`: [AWS Docs - GetEmailTemplateCommand](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/sesv2/command/GetEmailTemplateCommand/)
- AWS SES SDK v3 Package: [AWS Docs - SES SDK Package](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-sesv2/)

These resources provide valuable insights into how to effectively utilize AWS SES for email operations within Node.js applications.
