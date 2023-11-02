import { SES } from 'aws-sdk';

const ses = new SES({ region: 'us-west-1' });  // Adjust the region if necessary.

const SENDER_EMAIL = "sender@example.com";  // Replace with your sender's email.
const TEMPLATE_NAME = "MyTemplate";  // The name of the template you've created in SES.

export async function handler(event) {
    const receiverEmail = event.receiver_email;
    const templateData = event.template_data;

    const params = {
        Source: SENDER_EMAIL,
        Destination: {
            ToAddresses: [
                receiverEmail
            ]
        },
        Template: TEMPLATE_NAME,
        TemplateData: JSON.stringify(templateData)
    };

    try {
        const response = await ses.sendTemplatedEmail(params).promise();
        console.log("Email sent! Message ID:", response.MessageId);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully!' })
        };
    } catch (error) {
        console.error("Error sending email:", error);
        return {
            statusCode: 400,
            body: JSON.stringify({ error_message: error.message })
        };
    }
};
