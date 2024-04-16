package main

import (
	"bytes"
	"context"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/ses"
	"github.com/aws/aws-sdk-go-v2/service/ses/types"
	"html/template"
)

// getTemplate fetches an email template from AWS SES.
func getTemplate(ctx context.Context, client *ses.Client, templateName string) (*types.Template, error) {
	input := &ses.GetTemplateInput{
		TemplateName: aws.String(templateName),
	}
	resp, err := client.GetTemplate(ctx, input)
	if err != nil {
		return nil, err
	}
	return resp.Template, nil
}

// renderTemplate renders an email template with provided variables.
func renderTemplate(tmpl string, variables map[string]string) (string, error) {
	t, err := template.New("email").Parse(tmpl)
	if err != nil {
		return "", err
	}
	var buf bytes.Buffer
	if err := t.Execute(&buf, variables); err != nil {
		return "", err
	}
	return buf.String(), nil
}

// sendEmail sends an email using AWS SES.
func sendEmail(ctx context.Context, client *ses.Client, sender, recipient, subject, htmlBody string, attachments []string) error {
	// Prepare the message
	msg := ses.SendEmailInput{
		Destination: &types.Destination{
			ToAddresses: []string{recipient},
		},
		Message: &types.Message{
			Body: &types.Body{
				Html: &types.Content{
					Data: aws.String(htmlBody),
				},
			},
			Subject: &types.Content{
				Data: aws.String(subject),
			},
		},
		Source: aws.String(sender),
	}

	// Send the email
	_, err := client.SendEmail(ctx, &msg)
	return err
}

func main() {
	ctx := context.TODO()

	// Load AWS configuration
	cfg, err := config.LoadDefaultConfig(ctx)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to load SDK config, %v", err)
		os.Exit(1)
	}

	// Create an SES client
	sesClient := ses.NewFromConfig(cfg)

	// Example usage
	templateName := "YourTemplateName"
	sender := "sender@example.com"
	recipient := "recipient@example.com"
	subject := "Your email subject"

	// Fetch the template
	tmpl, err := getTemplate(ctx, sesClient, templateName)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to get template, %v", err)
		os.Exit(1)
	}

	// Render the template
	htmlBody, err := renderTemplate(*tmpl.HtmlPart, map[string]string{
		"UserName": "John Doe",
	})
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to render template, %v", err)
		os.Exit(1)
	}

	// Send the email
	if err := sendEmail(ctx, sesClient, sender, recipient, subject, htmlBody, nil); err != nil {
		fmt.Fprintf(os.Stderr, "Failed to send email, %v", err)
		os.Exit(1)
	}

	fmt.Println("Email sent successfully!")
}
