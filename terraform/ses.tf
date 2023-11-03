
resource "aws_ses_email_identity" "semplates_email_identity" {
  email = var.verified_email
}

resource "aws_ses_template" "semplates_demo_template" {
  name    = "SEMPLATES_DEMO_TEMPLATE"
  subject = "Semplates Test Lambda Function"
  html    = file("${path.module}/static/demo_template.html")
}
