# lib/lambda-handler/handler.py

import json

def handler(event, context):
    """
    AWS Lambda Python handler
    """
    print("hello world")

    return {
        "statusCode": 200,
    }
