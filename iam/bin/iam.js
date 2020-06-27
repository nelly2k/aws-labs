#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { IamStack } = require('../lib/iam-stack');

const app = new cdk.App();
new IamStack(app, 'IamStack');
