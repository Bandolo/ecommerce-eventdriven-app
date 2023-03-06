import { APIGatewayProxyEvent } from 'aws-lambda';
import { httpResponse } from '@libs/APIResponses';
import Dynamo from '@libs/Dynamo';
import { OrderRecord } from 'src/types/dynamo';
import Authorisation from '@libs/Authorisation';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    await Authorisation.apiKeyAuth(event);
  } catch (error) {
    console.log(error);
    return httpResponse({
      statusCode: 401,
      body: { message: 'API Key auth failed' },
    });
  }

  try {
    const ordersTableName = process.env.ordersTable;
    const orderId = event.pathParameters.orderId;
    const order = await Dynamo.get<OrderRecord>({
      pkValue: orderId,
      tableName: ordersTableName,
    });

    if (!order || !order.id) {
      return httpResponse({ statusCode: 404, body: {} });
    }

    const updatedOrder: OrderRecord = {
      ...order,
      status: 'delivered',
      dateUpdated: Date.now(),
    };

    await Dynamo.write({
      data: updatedOrder,
      tableName: ordersTableName,
    });

    return httpResponse({ body: { message: 'order delivery accepted' } });
  } catch (error) {
    return httpResponse({ statusCode: 500, body: error.message });
  }
};
