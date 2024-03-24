from auth import get_aws_clients
from ses_utils import copy_templates

if __name__ == "__main__":
    client_source, client_target = get_aws_clients()
    copy_templates(client_source, client_target)
