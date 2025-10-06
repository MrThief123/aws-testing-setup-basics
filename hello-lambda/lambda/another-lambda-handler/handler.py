import os
import boto3
import json

def secretsTest(event, context):
    secret_name = os.environ["SECRET_NAME"]
    region_name = os.environ.get("AWS_REGION", "ap-southeast-2")

    client = boto3.client("secretsmanager", region_name=region_name)

    try:
        response = client.get_secret_value(SecretId=secret_name)

        if "SecretString" in response:
            secret = json.loads(response["SecretString"])
            username = secret.get("username")
            password = secret.get("password")
        else:
            raise Exception("Secret is not in string format")

        print(f"Fetched credentials for {username}")  # safe to log username
        return {"status": "success", "username": username}  # don't return password unless necessary

    except Exception as e:
        print(f"Error fetching secret: {e}")
        return {"status": "error", "message": str(e)}
