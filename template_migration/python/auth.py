import os

import boto3


def create_ses_client_with_key_pair(aws_access_key_id, aws_secret_access_key, aws_region):
    return boto3.client(
        'ses',
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key,
        region_name=aws_region,
    )


def get_aws_clients():
    if os.getenv('SOURCE_AWS_ACCESS_KEY_ID'):
        client_source = create_ses_client_with_key_pair(
            aws_access_key_id=os.getenv('SOURCE_AWS_ACCESS_KEY_ID'),
            aws_secret_access_key=os.getenv('SOURCE_AWS_SECRET_ACCESS_KEY'),
            aws_region=os.getenv('SOURCE_AWS_REGION'),
        )

        client_target = create_ses_client_with_key_pair(
            aws_access_key_id=os.getenv('TARGET_AWS_ACCESS_KEY_ID'),
            aws_secret_access_key=os.getenv('TARGET_AWS_SECRET_ACCESS_KEY'),
            aws_region=os.getenv('TARGET_AWS_REGION'),
        )

    else:
        session_source = boto3.Session(profile_name='source_profile')
        client_source = session_source.client('ses')

        session_target = boto3.Session(profile_name='target_profile')
        client_target = session_target.client('ses')

    return client_source, client_target
