data "aws_iam_policy_document" "ses_send_templated_email_policy" {
  statement {
    effect = "Allow"
    actions = [
      "ses:SendTemplatedEmail"
    ]
    resources = [
      aws_ses_email_identity.semplates_email_identity.arn,
      aws_ses_template.semplates_demo_template.arn
    ]
  }

  statement {
    effect = "Allow"
    actions = [
      "ses:GetTemplate",
    ]
    resources = [aws_ses_template.semplates_demo_template.arn]
  }
}

resource "aws_iam_policy" "ses_send_templated_email" {
  name        = "SESSendTemplatedEmailPolicy"
  description = "Policy to allow SES sendTemplatedEmail only."
  policy      = data.aws_iam_policy_document.ses_send_templated_email_policy.json
}

module "lambda_function" {
  source = "terraform-aws-modules/lambda/aws"
  function_name = "PythonSesEmailSender"
  source_path   = "${path.module}/../lambdas/python/"
  handler       = "main.lambda_handler"
  runtime       = "python3.11"
  attach_policy = true
  policy        = aws_iam_policy.ses_send_templated_email.arn
}
