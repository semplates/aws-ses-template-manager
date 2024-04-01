# AWS SES Template Copier

This Node.js script facilitates the copying of AWS Simple Email Service (SES) email templates from one AWS account to another. It's designed to streamline the process of managing SES email templates across different AWS environments, making it an ideal solution for developers looking to migrate or backup SES templates efficiently.

## Prerequisites

Before running the script, ensure you have the following prerequisites met:

- Node.js installed on your system (version 12.x or later is recommended).
- An AWS account with access to SES and the necessary permissions to list and create email templates.
- The AWS CLI installed and configured with at least two profiles (source and target AWS accounts) or the necessary environment variables set for AWS credentials.
- The `aws-sdk` and `dotenv` npm packages.

## Goal

The script aims to automate the process of copying SES email templates from a source AWS account to a target AWS account. This includes listing all email templates in the source account, retrieving each template's content, and creating corresponding templates in the target account.

## How to Execute

1. **Install Dependencies**: Run `npm install aws-sdk dotenv` to install the required Node.js packages.

2. **Set up Environment Variables**: Create a `.env` file in the root of your project directory with the following environment variables:

```
SOURCE_AWS_ACCESS_KEY_ID=your_source_access_key_id_here
SOURCE_AWS_SECRET_ACCESS_KEY=your_source_secret_access_key_here
SOURCE_AWS_REGION=your_source_region_here
TARGET_AWS_ACCESS_KEY_ID=your_target_access_key_id_here
TARGET_AWS_SECRET_ACCESS_KEY=your_target_secret_access_key_here
TARGET_AWS_REGION=your_target_region_here
```

Replace the placeholder values with your actual AWS credentials and regions for the source and target accounts.

3. **Run the Script**: Execute the script by running `node sendTemplate.js` in your terminal. Ensure you're in the project's root directory where the `sendTemplate.js` file is located.

## Output

Upon successful execution, the script logs the names of the templates it has copied to the target AWS account. In case a template already exists in the target account, it will skip the copy operation for that template and log a message indicating the skip.

For any errors encountered during the process, the script will log detailed error messages to help diagnose and resolve the issue.

---

**Note**: This script does not delete or modify existing templates in the source or target accounts. It only reads from the source account and creates new templates in the target account.
