# Migrating AWS SES Templates using python

When working with AWS services in a script, such as migrating AWS SES email templates between accounts or regions, you have two primary methods to configure your AWS credentials: using AWS CLI profiles or environment variables. Each method has its specific setup process and use case scenarios. Here's how you can set up both:

### Using AWS CLI Profiles
AWS CLI Profiles are useful for managing multiple sets of credentials on the same machine and are especially handy when you frequently switch between different AWS accounts or regions.

#### Setup AWS CLI Profiles:
Install the AWS CLI: If you haven't already, download and install the AWS Command Line Interface (CLI) from the official AWS documentation.

Configure Profiles: Use the aws configure command to set up your profiles. For each profile, you will enter the access key ID, secret access key, default region, and output format. Specify a profile name using --profile profile_name.

```bash
aws configure --profile source_profile
aws configure --profile target_profile
```

**Pros and Cons:**

Pros: 
- Easy to switch between multiple accounts; 
- credentials are stored securely in your AWS configuration.

Cons: 
- Less flexible for dynamic configurations or when deploying to environments where modifying AWS CLI configurations isn't practical.

### Using Environment Variables
Environment Variables are ideal for dynamic configurations, such as when running scripts in CI/CD pipelines, Docker containers, or serverless environments where you may not want to use or alter the AWS CLI configuration files.

**Setup Environment Variables:**
Export Credentials: You need to export your AWS credentials as environment variables. This can be done in your terminal session or script runtime environment.

For the source account:

```bash
export SOURCE_AWS_ACCESS_KEY_ID=source_access_key_id
export SOURCE_AWS_SECRET_ACCESS_KEY=source_secret_access_key
export SOURCE_AWS_REGION=source_region
export TARGET_AWS_ACCESS_KEY_ID=target_access_key_id
export TARGET_AWS_SECRET_ACCESS_KEY=target_secret_access_key
export TARGET_AWS_REGION=target_region
```


## RUN

```bash
python main.py
```