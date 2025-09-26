# lib/lambda-handler/handler.py

import json

def myfunc1(event, context):
    """
    AWS Lambda Python handler
    """
    print("hello world")

    return {
        "statusCode": 200,
    }
