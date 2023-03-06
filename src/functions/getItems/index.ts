import { APIGatewayProxyEvent } from 'aws-lambda';
import { httpResponse } from '@libs/APIResponses';
import Dynamo from '@libs/Dynamo';
import { ItemsRecord } from 'src/types/dynamo';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const itemsTable = process.env.itemTable
    const { category, type, brand} = event.queryStringParameters || {};
    if (!category) {
      return httpResponse({
        statusCode: 400,
        body: { message: 'No "category" query provided' },
      });
    }

    let sk = undefined
    if (type) {
      sk = type;
      if (brand) {
        sk = `${type}#${brand}`;
      }
    }

    const itemsResponse = await Dynamo.query<ItemsRecord>({
      tableName: itemsTable,
      index: 'index1',
      pkValue: category,
      skBeginsWith: sk,
      skKey: sk ? 'sk' : undefined
    })

    const itemData = itemsResponse.map(({
      pk, sk, ...others
    }) => others)

    return httpResponse({ body: itemData });
  } catch (error) {
    console.error(error);
    return httpResponse({ statusCode: 500, body: error.message });
  }
};

