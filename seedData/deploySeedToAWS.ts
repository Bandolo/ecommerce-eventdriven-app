import seedDataGenerator from './generateItemJson';
import * as AWS from 'aws-sdk';

const saveToDynamo = async ({ data, tableName }: { data: any[]; tableName: string }) => {
  const env = process.env.environment;


  if (!env) {
    throw Error('environment parameter not provided');
  }

  

  const profile = {
    dev: 'default',
    int: 'int-serverlessUser',
    preprod: 'preprod-serverlessUser', 
    prod: 'prod-serverlessUser',
  }[env];

  if (!profile) {
    throw Error('environment parameter is invalid');
  }


  await batch({
    data,
    tableName,
    profile,
  });
};

const batch = async ({
  data,
  tableName,
  profile,
}: {
  data: any[];
  tableName: string;
  profile: string;
}) => {
  AWS.config.credentials = new AWS.SharedIniFileCredentials({
    profile,
  });
  const config = {
    region: 'us-east-1',
    convertEmptyValues: true,
  };

  const documentClient = new AWS.DynamoDB.DocumentClient(config);

  const formattedRecords = data.map(record => {
    return {
      PutRequest: {
        Item: record,
      },
    };
  });

  try {
    while (formattedRecords.length > 0) {
      const batch = formattedRecords.splice(0, 15);


      const params = {
        RequestItems: {
          [tableName]: batch,
        },
      };



      await documentClient.batchWrite(params).promise();
      console.log('batch written');
      console.log(`remaining items = ${formattedRecords.length}`);
    }

    console.log('all done');
  } catch (error) {
    console.log('error batch writing to AWS');
    console.log(error);
  }
};

const deployToAWS = async () => {
  const records = seedDataGenerator();

  await saveToDynamo({
    data: records,
    tableName: `${process.env.environment}-ecom-app-item-table`,
  });
};

deployToAWS();