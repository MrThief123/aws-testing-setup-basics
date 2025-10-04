import os
import boto3
import json

def secretsTest(event, context):
    secret_name = os.environ["SECRET_NAME"]
    region_name = os.environ.get("AWS_REGION", "us-east-1")

    client = boto3.client("secretsmanager", region_name=region_name)

    try:
        get_secret_value_response = client.get_secret_value(SecretId=secret_name)

        if "SecretString" in get_secret_value_response:
            secret = get_secret_value_response["SecretString"]
            creds = json.loads(secret)
            username = creds["username"]
            password = creds["password"]
        else:
            raise Exception("Secret is not in string format")

        print(f"Fetched credentials for {username}")
        return {"status": "success"}

    except Exception as e:
        print(f"Error fetching secret: {e}")
        return {"status": "error", "message": str(e)}
