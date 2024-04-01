
# AWS SES Email Template Migration

This guide outlines the process of migrating AWS Simple Email Service (SES) email templates between two AWS accounts using a Bash script. The migration is performed via the AWS Command Line Interface (CLI), leveraging the capabilities of AWS profiles for authentication.

## Prerequisites

- AWS CLI installed on your local machine. [AWS CLI Installation Guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
- Access to two AWS accounts (source and target) with permissions to manage SES templates.
- Basic familiarity with terminal or command line interface.

## Setup

### Step 1: Configure AWS CLI Profiles

AWS CLI profiles allow you to store and access multiple sets of credentials. This is particularly useful for managing resources across different AWS accounts.

1. **Create AWS Profiles:**
    - Open your terminal.
    - Run the `aws configure --profile profile_name` command for each account, replacing `profile_name` with a name that is meaningful to you (e.g., `aws-profile-source` for the source account and `aws-profile-target` for the target account).

   For the source account:
   ```bash
   aws configure --profile aws-profile-source
   ```
   Enter your AWS Access Key ID, Secret Access Key, and default region when prompted.

   Repeat for the target account:
   ```bash
   aws configure --profile aws-profile-target
   ```

### Step 2: Verify AWS Profiles Setup

- To ensure your profiles are correctly set up, you can list the stored profiles by checking the `~/.aws/credentials` file or by running:
  ```bash
  aws configure list-profiles
  ```
- You should see `aws-profile-source` and `aws-profile-target` listed among other profiles you may have.

## Running the Migration Script

1. **Prepare the Migration Script:**
    - Ensure the script `migrate.sh` is on your local machine and located in a directory where you intend to run it.
    - Replace `source_profile` and `target_profile` variables in the script with the profile names you've created (`aws-profile-source` and `aws-profile-target`).

2. **Make the Script Executable:**
    - In your terminal, navigate to the directory containing `migrate.sh`.
    - Run the following command to make it executable:
      ```bash
      chmod +x migrate.sh
      ```

3. **Execute the Script:**
    - Still in the terminal and the directory where `migrate.sh` is located, run:
      ```bash
      ./migrate.sh
      ```
    - The script will begin the migration process, listing and migrating templates. Monitor the output for any errors or confirmation messages.

## Post-Migration Verification

After running the script, you can verify the migration by using the AWS Management Console or AWS CLI to list SES templates in the target account, ensuring all intended templates have been successfully copied.

## Troubleshooting

- If you encounter permission errors, verify that the IAM user or role associated with your AWS profiles has the necessary permissions for SES operations (`ses:ListTemplates`, `ses:GetTemplate`, and `ses:CreateTemplate`).
- For any issues with AWS CLI commands or profiles, refer to the [AWS CLI documentation](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) for troubleshooting advice.

## Additional Notes

This README assumes a basic level of familiarity with AWS services and the command line interface. For more complex migration needs or error handling, consider enhancing the script with additional functionality.
