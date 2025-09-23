#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { HelloLambdaStack } from '../lib/hello-lambda-stack';

const app = new cdk.App();
new HelloLambdaStack(app, 'HelloLambdaStack', {
  env: {
    account: process.env.AWS_ACCOUNT_ID || process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.AWS_DEFAULT_REGION || 'ap-southeast-2',
  },
});
