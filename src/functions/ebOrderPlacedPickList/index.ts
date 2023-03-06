import { EventBridgeEvent } from 'aws-lambda';
import Dynamo from '@libs/Dynamo';
import { OrderRecord, ItemsRecord } from 'src/types/dynamo';
import SES from '@libs/SES'
import axios from 'axios';
import { SecretsManager } from 'aws-sdk';
import Secrets from '@libs/secrets';

export const handler = async (event: EventBridgeEvent<'string', OrderRecord>) => {
  try {

    const details = event.detail;

    const authKey = await Secrets.getSecret('warehouseApiKey')

    await axios.post(
      'https:/httpstat.us/201', 
    {
      ...details,
    },
    {
      headers: {
        authorization: authKey,
      },
    }
    );

  console.log('warehouse API called')
    return;

  } catch (error) {
    console.error(error);
  }
};


