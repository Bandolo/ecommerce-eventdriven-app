import { APIGatewayProxyEvent } from 'aws-lambda';
import { httpResponse } from '@libs/APIResponses';
import Dynamo from '@libs/Dynamo';
import { ItemsRecord } from 'src/types/dynamo';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const itemsTable = process.env.itemTable
    const itemId = event.pathParameters.itemId;

    const itemData = await Dynamo.get<ItemsRecord>({
      pkValue: itemId,
      tableName: itemsTable
    })

    const {pk, sk, ... responseData} = itemData

    return httpResponse({ body: responseData });
  } catch (error) {
    console.error(error);
    return httpResponse({ statusCode: 500, body: error.message });
  }
};

