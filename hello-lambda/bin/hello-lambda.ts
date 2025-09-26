#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { HelloLambdaStack } from '../lib/hello-lambda-stack';
import { AnotherLambdaStack } from '../lib/another-lambda-stack';

const app = new cdk.App();

// Use default account/region from your AWS CLI profile
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

new HelloLambdaStack(app, 'HelloLambdaStack', { env });
new AnotherLambdaStack(app, 'AnotherLambdaStack', { env });
