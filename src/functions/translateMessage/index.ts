import { APIGatewayProxyEvent } from 'aws-lambda';
import { httpResponse } from '@libs/APIResponses';
import * as AWS from 'aws-sdk'
import { Translate } from 'aws-sdk';


const translate = new AWS.Translate();

export const handler = async (event: APIGatewayProxyEvent) => {

    const  body = JSON.parse(event.body);
    const { text, language } = body
    
    if (!text) {
      return httpResponse({statusCode: 400,body: {message: 'text is missing'}})
    }

    if (!language) {
      return httpResponse({statusCode: 400, body :{message: 'language is missing'}})
    }

    try {
      const translateParams: Translate.Types.TranslateTextRequest = {
        Text: text, 
        SourceLanguageCode: 'en', 
        TargetLanguageCode: language
      
      };
      const translatedMessage = await translate.translateText(translateParams).promise();
      return httpResponse({statusCode: 200, body : translatedMessage})

    } catch (error) {
    console.error(error);
    return httpResponse({ statusCode: 400, body: error.message });
  }
};

