import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'node:path';

export class AnotherLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Another Lambda function
    const fn = new lambda.Function(this, 'AnotherFunction', {
      runtime: lambda.Runtime.PYTHON_3_12,
      handler: 'handler.main',
      code: lambda.Code.fromAsset(path.join(__dirname, 'another-lambda-handler')),
    });
  }
}
