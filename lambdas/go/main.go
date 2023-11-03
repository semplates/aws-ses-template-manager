package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/ses"
	"github.com/aws/aws-sdk-go-v2/service/ses/types"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"net/http"
)

type EmailRequestBody struct {
	ReceiverEmail string            `json:"receiverEmail"`
	SenderEmail   string            `json:"senderEmail"`
	TemplateName  string            `json:"templateName"`
	Placeholders  map[string]string `json:"placeholders"`
}

func sendTemplatedEmail(client *ses.Client, input *ses.SendTemplatedEmailInput) (string, error) {
	output, err := client.SendTemplatedEmail(context.Background(), input)
	if err != nil {
		errorMessage := fmt.Sprintf(`{"error_message": "%s"}`, err.Error())
		return "", fmt.Errorf(errorMessage)
	}
	return *output.MessageId, nil
}

func handleRequest(ctx context.Context, request EmailRequestBody) (events.APIGatewayProxyResponse, error) {
	cfg, err := config.LoadDefaultConfig(ctx, config.WithRegion(os.Getenv("AWS_REGION")))
	if err != nil {
		return events.APIGatewayProxyResponse{}, err
	}

	client := ses.NewFromConfig(cfg)

	templateData, err := json.Marshal(request.Placeholders)
	if err != nil {
		return events.APIGatewayProxyResponse{}, err
	}

	input := &ses.SendTemplatedEmailInput{
		Source:       aws.String(request.SenderEmail),
		Destination:  &types.Destination{ToAddresses: []string{request.ReceiverEmail}},
		Template:     aws.String(request.TemplateName),
		TemplateData: aws.String(string(templateData)),
	}

	messageId, err := sendTemplatedEmail(client, input)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       err.Error(),
		}, nil
	}

	successMessage := fmt.Sprintf("Message successfully sent with Message ID: %s", messageId)
	return events.APIGatewayProxyResponse{
		StatusCode: http.StatusOK,
		Body:       successMessage,
	}, nil
}

func main() {
	if os.Getenv("AWS_LAMBDA_RUNTIME_API") != "" {
		lambda.Start(handleRequest)
	} else {
		localTest()
	}
}

func localTest() {
	// Mimic an event
	request := EmailRequestBody{
		ReceiverEmail: "jonathan@semplates.io",
		SenderEmail:   "jmandt@semplates.io",
		TemplateName:  "SEMPLATES_DEMO_TEMPLATE",
		Placeholders: map[string]string{
			"FIRST_NAME": "John",
			"LAST_NAME":  "Doe",
		},
	}

	response, err := handleRequest(context.Background(), request)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println("Response:", response.Body)
}