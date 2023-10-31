import json
import os

import boto3
from botocore.exceptions import ClientError

# Initialize the SES client.
# If you're running the function locally, make sure your AWS credentials are set up (e.g., via `~/.aws/credentials`
# If you're running this on AWS Lambda, ensure the execution role has permissions to use SES.
ses_client = boto3.client('ses', region_name=os.environ["AWS_REGION"])  # Adjust the region if necessary.


def send_templated_email(receiver_email: str, template_name: str, sender_email: str, template_data: dict):
    try:
        response = ses_client.send_templated_email(
            Source=sender_email,
            Destination={
                'ToAddresses': [
                    receiver_email,
                ],
            },
            Template=template_name,
            TemplateData=json.dumps(template_data)
        )
    except ClientError as e:
        print(e.response['Error']['Message'])
        return {
            "statusCode": 400,
            "body": json.dumps({'error_message': e.response['Error']['Message']})
        }

    print("Email sent! Message ID:", response['MessageId'])
    return {
        "statusCode": 200,
        "body": json.dumps({'message': 'Email sent successfully!'})
    }


def lambda_handler(event, context):
    try:
        receiver_email = event["receiver_email"]
        sender_email = event["sender_email"]
        template_name = event["template_name"]
        placeholders = event["placeholders"]

        return send_templated_email(receiver_email, template_name, sender_email, placeholders)
    except Exception as e:
        return {
            "statusCode": 400,
            "body": json.dumps({'error_message': f'Missing key in input: {str(e)}'})
        }
