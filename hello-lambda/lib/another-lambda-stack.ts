import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as dotenv from 'dotenv';

dotenv.config();

export class AnotherLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    // Pull credentials from .env
    const dbUsername = process.env.DB_USERNAME!;
    const dbPassword = process.env.DB_PASSWORD!;
    

    // Create secret in Secrets Manager
    const dbSecret = new secretsmanager.Secret(this, 'DBSecret', {
      secretName: 'myDbCredentials',
      secretStringValue: cdk.SecretValue.unsafePlainText(
        JSON.stringify({
          username: dbUsername,
          password: dbPassword,
        })
      ),
    });

    // Define Python Lambda function
    const myLambda = new lambda.Function(this, 'MyLambda', {
      runtime: lambda.Runtime.PYTHON_3_11,
      handler: 'handler.secretsTest',
      code: lambda.Code.fromAsset('lambda/another-lambda-handler'), // points to your /lambda folder
      environment: {
        SECRET_NAME: dbSecret.secretName, // pass secret name to Lambda
      },
    });

    // Give Lambda permission to read the secret
    dbSecret.grantRead(myLambda);
  }
}
