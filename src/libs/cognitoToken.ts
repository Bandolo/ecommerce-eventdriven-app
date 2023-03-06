
import {
  AdminInitiateAuthCommand,
  AuthenticationResultType,
  CognitoIdentityProviderClient,
  CognitoIdentityProviderClientConfig,
} from '@aws-sdk/client-cognito-identity-provider';

/**
 * Get credentials for an existing user.
 */
export const cognitoSignIn = async (params: {
  clientId: string;
  userPoolId: string;
  username: string;
  password: string;
  config?: CognitoIdentityProviderClientConfig;
}): Promise<AuthenticationResultType> => {
  const { clientId, userPoolId, username, password, config } = params;
  const client = new CognitoIdentityProviderClient(config)

  const { AuthenticationResult } = await client.send(
    new AdminInitiateAuthCommand({
      AuthFlow: 'ADMIN_NO_SRP_AUTH',
      ClientId: clientId,
      UserPoolId: userPoolId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    }),
  );

  if (!AuthenticationResult) {
    throw new Error('AuthenticationResult is undefined');
  }

  return AuthenticationResult;
};