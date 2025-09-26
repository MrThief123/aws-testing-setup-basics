import json

def main(event, context):
    """
    Another Lambda handler
    """
    print("This is the second Lambda function")
    return {
        "statusCode": 200,
        "body": json.dumps({"message": "Hello from Another Lambda!"})
    }
