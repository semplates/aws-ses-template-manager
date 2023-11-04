# Semplates AWS SES Template Manager

[Semplates](https://semplates.io) offers a graphical user interface to manage templates on AWS SES. If you are using our services, 
this repository can help you to deploy a Lambda function to AWS in order to easily send out automated emails to your users.
If you do not want to use a Lambda function to send transactional emails, you can use the code provided in this repository and integrate it into you application.
We currently provide the setup for 
- Go
- JavaScript
- Python

**This repository provides:**
- A base to easily set up AWS SES with Terraform.
- Examples to send emails based on templates via Lambda functions.
- Go, JavaScript and Python code to deploy to a Lambda function or integrate in to your application
- A Github Pipeline to directly setup AWS SES with Terraform and deploy a function to send transactional emails in AWS Lambda

License
Semplates is open source and free to use, also for companies. See the [LICENSE](LICENSE) file for details.

How to Contribute
We welcome contributions from the community! If you'd like to contribute to Semplates, please read through our [Contribution Guidelines](CONTRIBUTING.md).

## How to use the Pipeline to directly deploy from within this repository

### Prerequisites

- An AWS account
- AWS Credentials with permissions execute the terraform code
- Forked copy of this repository

### Setting Up

1. **Fork the Repository**: Click on the 'Fork' button in the top-right corner of this repository to create your own copy.

2. **AWS Credentials**: Ensure you have your AWS credentials at hand. If you don't have created any yet, please do so now. To create credentials with only the necessary permissions, please copy the contents of [aws-policy.json]

3. **Environment Variables**: For the pipeline to work, you need to set up the following environment variables:
    - `AWS_ACCESS_KEY_ID`: Your AWS access key.
    - `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key.
    - `AWS_REGION`: Your AWS default region (e.g., `eu-central-1`).
    - `SENDER_EMAIL`: The email address from which emails will be sent.
    - `PROGRAMMING_LANGUAGES`: The programming languages you would like to deploy the AWS Lambda function with

4. **Run the Pipeline**: Once the environment variables are set, trigger the pipeline. This will:
    - Set up the Lambda function.
    - Deploy a test template using Terraform.
    - Verify the email addresses provided (please check your email inbox and confirm).

5. **Send a Test Email**: 
   1. After email verification, you will need to sign in to the AWS Management Console and check your [AWS Lambda Functions](https://eu-central-1.console.aws.amazon.com/lambda)
   2. Select the test tab and enter the following Event JSON:
      ```json
      {
         "receiver_email": "<receiver-email>",
         "sender_email": "<sender-email>",
         "template_name": "SEMPLATES_DEMO_TEMPLATE",
         "placeholders": {
            "FIRST_NAME": "Jonathan",
            "LAST_NAME": "Doe"
         }
      }
      ```
   3. Hit the test button. The result should show:
      ```json
      {
        "statusCode": 200,
        "body": {
          "message": "Email sent successfully!"
        }
      }
      ```

## Features of Semplates for AWS Simple Email Service:
- Import existing AWS SES templates.
- Update, duplicate, or delete templates without using the CLI.
- Directly send test emails from within the service.
- Increase productivity for product and development teams.
- Contribute to the templates easily from different departments.

> **Note:** Semplates does not offer an API to track and monitor sending statistics for templates managed via our service. Automated emails still need to be sent via the backend of the user's service using AWS SDKs.

