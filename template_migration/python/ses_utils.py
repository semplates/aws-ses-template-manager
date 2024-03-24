def list_templates(client):
    """List all the template names."""
    paginator = client.get_paginator('list_templates')
    template_names = []
    for page in paginator.paginate():
        template_names += [template['Name'] for template in page['TemplatesMetadata']]
    return template_names


def get_template(client, template_name):
    """Get a single template by name."""
    response = client.get_template(TemplateName=template_name)
    return response['Template']


def copy_templates(source_profile, target_profile):
    """Copy all SES templates from the source AWS account to the target AWS account."""

    templates = list_templates(source_profile)

    for template_name in templates:
        template = get_template(source_profile, template_name)

        try:
            target_profile.create_template(Template=template)
            print(f"Copied template: {template_name}")
        except Exception as err:
            if 'AlreadyExists' in str(err):
                print(f"Template {template_name} already exists in target account. Skipping...")
                continue

            raise
