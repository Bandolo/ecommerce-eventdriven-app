import { EventBridgeEvent } from 'aws-lambda';
import Dynamo from '@libs/Dynamo';
import { OrderRecord, ItemsRecord } from 'src/types/dynamo';
// import { SES } from 'aws-sdk';
import SES from 'src/libs/SES';
import { Serializer } from 'v8';


export const handler = async (event: EventBridgeEvent<'string', OrderRecord>) => {
  try {
    const itemsTable = process.env.itemTable;

    const details = event.detail;

    const itemPromises = details.items.map(async (item) => {
      const itemData = await Dynamo.get<ItemsRecord>({
      tableName: itemsTable,
      pkValue: item.id,
    });

    //to remove before deploying
    console.log(typeof itemData.colorPreference?.find((color) => color.colorCode == item.color))

    return {
      count: item.count,
      title: itemData.title,
      color: itemData.colorPreference?.find((color) => color.colorCode == item.color) ,
    };

  });
  const itemDetails = await Promise.all(itemPromises);
    

    await SES.sendEmail({
      email: details.userEmail,
      subject: 'Your order has been placed',
      text: `Thanks for placing your order. We are preparing it at our warehouse.
      
      Your order is for 
      ${itemDetails.map(itemToRow)}
      
      We will let you know when that has been shipped!
      `,
    });
    console.log('sent email');
    return;

  } catch (error) {
    console.error(error);
  }
};

const itemToRow = ({count,title, color}:{
  count: number,
  title: string,
  color?:{ colorCode: number, displayValue: string} 
}) => {
  return `${count} ${title} ${color ? `in color ${color.displayValue}` : null}
  `;

};

