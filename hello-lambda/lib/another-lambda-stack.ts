import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';

export class AnotherLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a secret in Secrets Manager
    const dbSecret = new secretsmanager.Secret(this, 'DBSecret', {
      secretName: 'myDbCredentials',
      generateSecretString: {
        secretStringTemplate: JSON.stringify({ username: 'admin' }),
        generateStringKey: 'password',
      },
    });

    // Define Python Lambda function
    const myLambda = new lambda.Function(this, 'MyLambda', {
      runtime: lambda.Runtime.PYTHON_3_11,
      handler: 'handler.secretsTest',
      code: lambda.Code.fromAsset('lib/another-lambda-handler'), // points to your /lambda folder
      environment: {
        SECRET_NAME: dbSecret.secretName, // pass secret name to Lambda
      },
    });

    // Give Lambda permission to read the secret
    dbSecret.grantRead(myLambda);
  }
}
