import boto3
import json
from dotenv import load_dotenv
import os

# Read credentials
aws_access_key_id = os.getenv("AWS_ACCESS_KEY_ID")
aws_secret_access_key = os.getenv("AWS_SECRET_ACCESS_KEY")
aws_region = os.getenv("AWS_REGION")

# Explicitly pass credentials
session = boto3.Session(
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
    region_name=aws_region
)

lambda_client = session.client('lambda')

payload = {
  "key1": "value1",
  "key2": "value2",
  "key3": "value3"
}

response = lambda_client.invoke(
    FunctionName='hello-world',
    InvocationType='RequestResponse',
    Payload=json.dumps(payload).encode('utf-8')
)

response_payload = response['Payload'].read().decode('utf-8')

try:
    response_dict = json.loads(response_payload)
except json.JSONDecodeError:
    response_dict = {"raw": response_payload}


print(response_dict)
