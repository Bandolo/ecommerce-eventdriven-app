
import { APIGatewayProxyEvent } from 'aws-lambda';
import { httpResponse } from '@libs/APIResponses';
import Dynamo from '@libs/Dynamo';
import { OrderRecord } from 'src/types/dynamo';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const ordersTable = process.env.ordersTable
    const orderId = event.pathParameters.orderId;

    const orderData = await Dynamo.get<OrderRecord>({
      pkValue: orderId || '',
      tableName: ordersTable
    })

    // const {pk, sk, ... responseData} = orderData

    // return httpResponse({ body: responseData});
    return httpResponse({ body: orderData});
  } catch (error) {
    console.error(error);
    return httpResponse({ statusCode: 500, body: error.message });
  }
};