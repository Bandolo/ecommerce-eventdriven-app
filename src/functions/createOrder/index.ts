import { APIGatewayProxyEvent } from 'aws-lambda';
import { httpResponse } from '@libs/APIResponses';
import Dynamo from '@libs/Dynamo';
import { OrderRecord } from 'src/types/dynamo';
import {v4 as uuid } from 'uuid';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const ordersTable = process.env.ordersTable;


    const  order = JSON.parse(event.body);
    const userId = event.requestContext?.authorizer?.claims?.sub;
    const userEmail = event.requestContext?.authorizer?.claims?.email;

    const timestamp = Date.now();

    const fullOrder: OrderRecord = {
      id: uuid(),
      pk: userId,
      sk: `order#${timestamp}`,

      userId,
      userEmail,
      dateCreated: timestamp,
      status: 'placed',
      items: order.items,
    };

    await Dynamo.write({
      data: fullOrder,
      tableName: ordersTable,
    });

    // return httpResponse({ body: { message: 'order placed'} });
    return httpResponse({ body: {
      orderId: fullOrder.id
    } });

  } catch (error) {
    console.error(error);
    return httpResponse({ statusCode: 500, body: error.message });
  }
};

