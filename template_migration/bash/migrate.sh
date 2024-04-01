#!/bin/bash

# Define AWS profile names for source and target accounts
SOURCE_PROFILE=source_profile
TARGET_PROFILE=target_profile

# List all templates from the source account
TEMPLATE_NAMES=$(aws ses list-templates --profile $SOURCE_PROFILE --query 'TemplatesMetadata[*].Name' --output text)

# Loop through each template name and migrate to the target account
for TEMPLATE_NAME in $TEMPLATE_NAMES; do
    # Retrieve the template from the source account
    TEMPLATE_JSON=$(aws ses get-template --profile $SOURCE_PROFILE --template-name $TEMPLATE_NAME --output json)

    # Create or move the template in the target account
    echo "Migrating template: $TEMPLATE_NAME"
    aws ses create-template --profile $TARGET_PROFILE --cli-input-json "$TEMPLATE_JSON"
done

echo "Migration completed."