from http import HTTPStatus

import boto3

TEMPLATE_PATH = "../assets/registration.html"

TEMPLATE_NAME = "RegistrationTemplate"
SUBJECT_PART = "Welcome to Our Service!"

ses_client = boto3.client('ses')


def upload_template_to_ses(template_name, subject, html_content):
    """
    Uploads an email template to AWS SES.

    :param template_name: Name of the template
    :param subject: Subject part of the template
    :param html_content: HTML content for the email
    """
    try:
        response = ses_client.create_template(
            Template={
                'TemplateName': template_name,
                'SubjectPart': subject,
                'HtmlPart': html_content,
                'TextPart': 'This is the text part of the email.'
            }
        )
        if response.get("ResponseMetadata").get("HTTPStatusCode") == HTTPStatus.OK:
            print(f"Template '{template_name}' created successfully.")
        else:
            print("Unexpected Status Code returned from request")
    except Exception as e:
        print(f"Error creating template: {e}")


def read_html_file(file_path):
    """
    Reads the content of an HTML file.

    :param file_path: Path to the HTML file
    :return: Content of the file
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read()
    except Exception as e:
        print(f"Error reading file: {e}")
        return None


html_content = read_html_file(TEMPLATE_PATH)

if html_content:
    upload_template_to_ses(TEMPLATE_NAME, SUBJECT_PART, html_content)
else:
    print("Failed to read the HTML content. Cannot proceed with uploading the template.")
