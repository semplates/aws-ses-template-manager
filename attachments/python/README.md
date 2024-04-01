
# AWS SES Templated Email with Attachment

This project consists of two primary parts: The first part involves setting up an email template in AWS Simple Email Service (SES), and the second part deals with sending a templated email with an attachment using AWS SES. The objective is to automate the process of sending emails that follow a standard template for consistency but also allow for customization through placeholders within the template. This solution is especially useful in a production environment, where it might be deployed as a Lambda function or integrated into other AWS services for automated email sending tasks.

## Goal

The goal of this project is to streamline the email sending process using AWS SES, enabling users to send emails based on a predefined template and include attachments. This approach ensures consistency in email communication while providing flexibility to include personalized content and attachments.

## Prerequisites

Before executing the code, ensure the following prerequisites are met:

1. **AWS Account:** You need an active AWS account. If you do not have one, you can sign up at [AWS](https://aws.amazon.com/).

2. **AWS CLI:** Install and configure the AWS Command Line Interface (CLI). Follow the instructions provided in the [AWS CLI User Guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html).

3. **Python:** Ensure Python is installed on your system. This code is compatible with Python 3.6 and above.

4. **Boto3:** Install the Boto3 library, which allows you to directly interact with AWS services. You can install it using pip:

   ```
   pip install boto3
   ```

5. **Verify Email Addresses:** Ensure that the sender and recipient email addresses are verified in AWS SES in the region you are planning to use. AWS SES requires email address verification to prevent spam and abuse.

## Environment Setup

1. **AWS Credentials:** Set up your AWS credentials using the AWS CLI or by manually creating a credentials file. The AWS CLI command is:

   ```
   aws configure
   ```

   Enter your AWS Access Key ID, Secret Access Key, default region name, and default output format when prompted.

2. **Email Template:** Prepare an HTML file that will serve as the email template. This template should include placeholders for dynamic content that will be replaced at runtime.

## Execution

### Part 1: Uploading the Email Template to AWS SES

This part involves reading an HTML file from the specified path and uploading it as an email template to AWS SES.

1. **Modify the Script:**

    - Set `TEMPLATE_PATH` to the path of your HTML email template file.
    - Customize `TEMPLATE_NAME` and `SUBJECT_PART` as required.

2. **Run the Script:**

   Execute the script to upload your email template to AWS SES:

   ```
   python upload_template.py
   ```

### Part 2: Sending a Templated Email with an Attachment

This part sends an email using the uploaded template, filling in the placeholders with dynamic content, and attaches a PDF file.

1. **Prepare Attachment:**

    - Ensure the attachment file (e.g., `dummy.pdf`) is present at the specified path.

2. **Customize the Script:**

    - Modify `TEMPLATE_NAME`, `TEMPLATE_DATA`, `SENDER_ADDRESS`, and `RECIPIENT_ADDRESS` within the script based on your requirements.

3. **Run the Script:**

   Execute the script with the sender and recipient email addresses as arguments:

   ```
   python send_email.py --sender sender@example.com --recipient recipient@example.com
   ```

This setup is designed for flexibility and can be adapted to various use cases, such as customer registration emails, event notifications, or any scenario requiring consistent email communication with a personal touch. Deploying this solution in a serverless environment like AWS Lambda further enhances its scalability and integration capabilities within AWS ecosystems.
