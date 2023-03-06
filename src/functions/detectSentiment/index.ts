import { APIGatewayProxyEvent } from 'aws-lambda';
import { httpResponse } from '@libs/APIResponses';
import * as AWS from 'aws-sdk'
import { Comprehend } from 'aws-sdk';


const comprehend = new AWS.Comprehend();

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
      const sentimentParams: Comprehend.Types.DetectSentimentRequest = {
        Text: text, 
        LanguageCode: language
      };
      const detectSentiment = await comprehend.detectSentiment(sentimentParams).promise();
      return httpResponse({statusCode: 200, body : detectSentiment})

    } catch (error) {
    console.error(error);
    return httpResponse({ statusCode: 400, body: error.message });
  }
};

