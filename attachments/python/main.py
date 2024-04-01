import argparse
import sys
import boto3
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import email

from attachments.python.mime_utils import decode_mime_part
from attachments.python.ses_utils import render_html_template

# Parse command-line arguments
parser = argparse.ArgumentParser(description='Send a templated email with an attachment via AWS SES.')
parser.add_argument('--sender', required=True, help='Email address of the sender.')
parser.add_argument('--recipient', required=True, help='Email address of the recipient.')
args = parser.parse_args()

SENDER_ADDRESS = args.sender
RECIPIENT_ADDRESS = args.recipient

ATTACHMENT = "../assets/dummy.pdf"
TEMPLATE_NAME = "RegistrationTemplate"
TEMPLATE_DATA = '{"USER_NAME": "John Doe"}'


if __name__ == "__main__":
    ses_client = boto3.client('ses')

    try:
        rendered_body = render_html_template(
            ses_client,
            TEMPLATE_NAME,
            TEMPLATE_DATA
        )
    except Exception as e:
        sys.exit(1)

    parsed_mime = email.message_from_string(rendered_body)
    subject = parsed_mime['Subject'] if parsed_mime['Subject'] else 'Templated Email with Attachment'

    alt_container = MIMEMultipart('alternative')

    for part in parsed_mime.walk():
        # Assuming part is a non-multipart entity
        if part.get_content_maintype() == 'text':
            decoded_payload, content_type = decode_mime_part(part)
            alt_container.attach(MIMEText(decoded_payload, content_type))

    # Create a multipart/mixed parent container
    msg = MIMEMultipart('mixed')
    msg['Subject'] = subject
    msg['From'] = SENDER_ADDRESS
    msg['To'] = RECIPIENT_ADDRESS
    msg.attach(alt_container)

    # Attach the PDF
    with open(ATTACHMENT, 'rb') as attachment:
        part = MIMEApplication(attachment.read())
        part.add_header('Content-Disposition', 'attachment', filename='attachment.pdf')
        msg.attach(part)

    try:
        response = ses_client.send_raw_email(
            Source=SENDER_ADDRESS,
            Destinations=[RECIPIENT_ADDRESS],
            RawMessage={'Data': msg.as_string()},
        )
        print(f"Email sent to {RECIPIENT_ADDRESS}! Message ID: {response['MessageId']}")
    except Exception as e:
        print(f"Error sending email: {e}")