import { AWS } from '@serverless/typescript';

const corsSettings = {
  headers: [
    // Specify allowed headers
    'Content-Type',
    'X-Amz-Date',
    'Authorization',
    'X-Api-Key',
    'X-Amz-Security-Token',
    'X-Amz-User-Agent',
  ],
  allowCredentials: false,
};


interface Authorizer {
  name: string;
  type: string;
  arn: {
    'Fn::GetAtt': string[];
  };
}
const authorizer: Authorizer = {
  name: 'authorizer',
  type: 'COGNITO_USER_POOLS',
  arn: { 'Fn::GetAtt': ['CognitoUserPool', 'Arn'] },
};

const iamGetSecret = {
    Effect: 'Allow',
    Action: ['secretsmanager:GetSecretValue'],
    Resource: '*',
}

const functions: AWS['functions'] = {
  getItems: {
    handler: 'src/functions/getItems/index.handler',
    events: [
      {
        http: {
          method: 'get',
          path: 'items',
          cors: corsSettings,
        },
      },
    ],
  },

getItem: {
  handler: 'src/functions/getItem/index.handler',
  events: [
    {
      http: {
        method: 'get',
        path: 'item/{itemId}',
        cors: corsSettings,
      },
    },
  ],
},

createOrder: {
  handler: 'src/functions/createOrder/index.handler',
  events: [
    {
      http: {
        method: 'post',
        path: 'orders',
        cors: corsSettings,
        authorizer

      },
    },
  ],
},

getOrder: {
  handler: 'src/functions/getOrder/index.handler',
  events: [
    {
      http: {
        method: 'get',
        path: 'order/{orderId}',
        cors: corsSettings,
        authorizer
      },
    },
  ],
},

getOrders: {
  handler: 'src/functions/getOrders/index.handler',
  events: [
    {
      http: {
        method: 'get',
        path: 'orderlist',
        cors: corsSettings,
        authorizer
      },
    },
  ],
},

streamHandler: {
  handler: 'src/functions/streamHandler/index.handler',
  events: [
    {
      stream: {
        type: 'dynamodb',
        arn: {
          'Fn::GetAtt': ['OrdersTable', 'StreamArn'],
        },
      },
    },
  ],
//@ts-expect-error
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: ['events:PutEvents'],
      Resource: 'arn:aws:events:${self:provider.region}:${aws:accountId}:event-bus/${self:custom.eventBridgeBusName}'
    }
  ]
},

ebOrderPlacedNotification: {
  handler: 'src/functions/ebOrderPlacedNotification/index.handler',
  events: [
    {
      eventBridge: {
        eventBus: '${self:custom.eventBridgeBusName}',
        pattern: {
          source: ['order.placed']
        }
      },
    },
  ],
//@ts-expect-error
  iamRoleStatementsInherit: true,
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: ['ses:sendEmail'],
      Resource: '*',
    },
  ],
},

ebOrderPlacedPickList: {
  handler: 'src/functions/ebOrderPlacedPickList/index.handler',
  events: [
    {
      eventBridge: {
        eventBus: '${self:custom.eventBridgeBusName}',
        pattern: {
          source: ['order.placed']
        }
      },
    },
  ],
//@ts-expect-error
  iamRoleStatements: [iamGetSecret],
},

packingComplete: {
  handler: 'src/functions/packingComplete/index.handler',
  events: [
    {
      http: {
        method: 'post',
        path: 'orderpacked/{orderId}',
        cors: corsSettings,
      },
    },
  ],
  //@ts-expect-error
  iamRoleStatementsInherit: true,
  iamRoleStatements: [iamGetSecret],
},

ebOrderPackedNotification: {
  handler: 'src/functions/ebOrderPackedNotification/index.handler',
  events: [
    {
      eventBridge: {
        eventBus: '${self:custom.eventBridgeBusName}',
        pattern: {
          source: ['order.packed']
        }
      },
    },
  ],
  //@ts-expect-error
  iamRoleStatementsInherit: true,
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: ['ses:sendEmail'],
      Resource: '*',
    },
  ],
},

deliveryComplete: {
  handler: 'src/functions/deliveryComplete/index.handler',
  events: [
    {
      http: {
        method: 'post',
        path: 'orderdelivered/{orderId}',
        cors: corsSettings,
      },
    },
  ],
  //@ts-expect-error
  iamRoleStatementsInherit: true,
  iamRoleStatements: [iamGetSecret],
},

ebOrderDeliveredNotification: {
  handler: 'src/functions/ebOrderDeliveredNotification/index.handler',
  events: [
    {
      eventBridge: {
        eventBus: '${self:custom.eventBridgeBusName}',
        pattern: {
          source: ['order.delivered']
        }
      },
    },
  ],
  //@ts-expect-error
  iamRoleStatementsInherit: true,
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: ['ses:sendEmail'],
      Resource: '*',
    },
  ],
},

translateMessage: {
  handler: 'src/functions/translateMessage/index.handler',
  events: [
    {
      http: {
        method: 'post',
        path: 'translate',
        cors: corsSettings,
        // authorizer
      },
    },
  ],
  //@ts-expect-error
  // iamRoleStatementsInherit: true,
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: ['translate:*'],
      Resource: '*',
    },
  ],
},

detectSentiment: {
  handler: 'src/functions/detectSentiment/index.handler',
  events: [
    {
      http: {
        method: 'post',
        path: 'sentiment',
        cors: corsSettings,
        // authorizer
      },
    },
  ],
  //@ts-expect-error
  // iamRoleStatementsInherit: true,
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: ['comprehend:*'],
      Resource: '*',
    },
  ],
},

};

export default functions;
