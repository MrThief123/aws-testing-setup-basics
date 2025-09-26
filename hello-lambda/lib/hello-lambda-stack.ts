import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import * as path from 'node:path';

export class HelloLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda function
    const fn = new lambda.Function(this, 'MyFunction', {
      runtime: lambda.Runtime.PYTHON_3_12,
      handler: 'handler.myfunc1',
      code: lambda.Code.fromAsset(path.join(__dirname, 'lambda-handler')),
    });

    // API Gateway endpoint
    new apigw.LambdaRestApi(this, 'ApiGwEndpoint', {
      handler: fn,
      restApiName: 'HelloApi',
    });
  }
}
