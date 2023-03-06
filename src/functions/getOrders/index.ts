import { APIGatewayProxyEvent } from 'aws-lambda';
import { httpResponse } from '@libs/APIResponses';
import Dynamo from '@libs/Dynamo';
import * as AWS from 'aws-sdk';
import { unmarshal } from 'dynamo-types/dst/codec';
import { Attribute } from 'dynamo-types/dst/metadata';
// import { OrderRecord } from 'src/types/dynamo';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {

    const userId = event.requestContext?.authorizer?.claims?.sub;

    const ordersTable = process.env.ordersTable

    const ordersResponse = await Dynamo.query({
      tableName: ordersTable,
      index: 'index1',
      pkValue: userId,
      limit:10
    })

    const itemData = ordersResponse.map(({
      pk, sk, ...others
    }) => others)

    return httpResponse({ body: itemData });
  } catch (error) {
    console.error(error);
    return httpResponse({ statusCode: 500, body: error.message });
  }
};

