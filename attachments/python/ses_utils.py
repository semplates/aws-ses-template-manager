def render_html_template(ses_client, template_name, data):
    try:
        response = ses_client.test_render_template(
            TemplateName=template_name,
            TemplateData=data
        )
        return response['RenderedTemplate']
    except Exception as e:
        print(f"Error rendering template: {e}")
        raise
