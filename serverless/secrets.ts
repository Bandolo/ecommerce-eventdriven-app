import { AWS } from '@serverless/typescript';

const SecretsConfig: AWS['resources']['Resources'] = {
  warehouseApiKey: {
    Type: 'AWS::SecretsManager::Secret',
    Properties: {
      Description: 'API key needed to call the warehouse',
      Name: 'warehouseApiKey',
      SecretString: '${env:warehouseApiKey}',
    },
  },
  orderpackedApiKeys: {
    Type: 'AWS::SecretsManager::Secret',
    Properties: {
      Description: 'API key passed by the warehouse',
      Name: 'auth-/orderpacked/_orderId_',
      SecretString: '${env:orderpackedApiKeys}',
    },
  },

  orderdeliveredApiKeys: {
    Type: 'AWS::SecretsManager::Secret',
    Properties: {
      Description: 'API key passed by the warehouse',
      Name: 'auth-/orderdelivered/_orderId_',
      SecretString: '${env:orderdeliveredApiKeys}',
    },
  },

  cognitoUserName: {
    Type: 'AWS::SecretsManager::Secret',
    Properties: {
      Description: 'Cognito Username passed to get access token',
      Name: 'cognitoUserName',
      SecretString: '${env:cognitoUserName}',
    },

  }
};

export default SecretsConfig;
