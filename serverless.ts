import type { AWS } from '@serverless/typescript';

import functions from './serverless/functions';
import DynoDbResources from './serverless/dynamodb';
import CognitoResources from './serverless/cognitoResources';
import SecretsConfig from './serverless/secrets'


const serverlessConfiguration: AWS = {
  service: 'ecom-app',
  frameworkVersion: '3',
  useDotenv: true,

  plugins: ['serverless-esbuild', 'serverless-offline','serverless-iam-roles-per-function'],
  custom: {
    tables: {
      itemTable: '${sls:stage}-${self:service}-item-table',
      ordersTable: '${sls:stage}-${self:service}-orders-table',
    },
    // profile: {
    //   dev: 'serverlessDev',
    //   int: 'int-profile',
    //   preprod: 'preprod-profile',
    //   prod: 'prod-profile',
    // },
    eventBridgeBusName: 'ordersEventBus',

    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node16',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    profile: '${self:custom.profile.${sls:stage}}',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      itemTable: '${self:custom.tables.itemTable}',
      ordersTable: '${self:custom.tables.ordersTable}',
      region: '${self:provider.region}',
      eventBridgeBusName: '${self:custom.eventBridgeBusName}',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 'dynamodb:*',
        Resource: [
          'arn:aws:dynamodb:${self:provider.region}:${aws:accountId}:table/${self:custom.tables.itemTable}',
          'arn:aws:dynamodb:${self:provider.region}:${aws:accountId}:table/${self:custom.tables.itemTable}/index/index1',
          'arn:aws:dynamodb:${self:provider.region}:${aws:accountId}:table/${self:custom.tables.ordersTable}',
          'arn:aws:dynamodb:${self:provider.region}:${aws:accountId}:table/${self:custom.tables.ordersTable}/index/index1',
        ],
      },
    ],
  },
  functions,

  resources: {
    Resources: {
      ...DynoDbResources,
      ...CognitoResources,
      ...SecretsConfig
    },
    Outputs: {
      ItemDynoTableName: {
        Value: '${self:custom.tables.itemTable}',
        Export: {
          Name: 'ItemDynoTableName',
        },
      },
      OrderDynoTableName: {
        Value: '${self:custom.tables.ordersTable}',
        Export: {
          Name: 'OrdersDynamoTableName',
        },
      },
      UserPoolId: {
        Value: { Ref: 'CognitoUserPool' },
        Export: {
          Name: 'UserPoolId',
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
