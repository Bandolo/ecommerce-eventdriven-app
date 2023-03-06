import axios from 'axios';
import {dynamodbItem,} from 'sls-jest';
jest.setTimeout(120000);
import {cognitoSignIn} from '../../src/libs/cognitoToken'
// import Secrets from '../../src/libs/secrets';


let tokenSignin: string | undefined

const params = {
  clientId: '7jt5murnq8pkj78f0umbppc4o',
  userPoolId: 'us-east-1_6dixx9FLR',
  username: "84988f8c-f45a-4727-a00d-df0ffc2b36a7",
  password: 'Cognitosman'
}


beforeAll(async () => {
const response = await cognitoSignIn(params) 

tokenSignin = response.IdToken
console.log(tokenSignin)
})


const endpointCreateOrder = 'https://5sjj467qy9.execute-api.us-east-1.amazonaws.com/dev/orders'
const payloadCreateOrder = {
  "items":[
      {
          "id":"5df26ada-a335-4099-b8a6-df1c12f633a0",
          "count":2,
          "color":1
      }
  ]
}


let orderId: string | undefined

beforeAll(async () => {
  const response = await axios.post(endpointCreateOrder, payloadCreateOrder, {headers: {Authorization: tokenSignin}});
  orderId = response.data.orderId
})


describe('Cart', () => {
  it('order should exist in the orders dynamodb table', async () => {
    await expect(
      dynamodbItem({
        tableName: 'dev-ecom-app-orders-table',
        key: {
          id: orderId,
        },
      })
    ).toExist()
  });

    it('order status should change from "placed" to "packed" when calling "/orderpacked"', async () => {
    
    const endpointPackOrder = `https://5sjj467qy9.execute-api.us-east-1.amazonaws.com/dev/orderpacked/${orderId}`
    const apiKeyPackOrder = "d3e6c8d8-86bb-4ed7-b5d8-acd928effd7e"

    await axios.post(endpointPackOrder, {}, {headers: {Authorization: apiKeyPackOrder}});
    

    await expect(
      dynamodbItem({
        tableName: 'dev-ecom-app-orders-table',
        key: {
          id: orderId,
        },
      })
    ).toExistAndMatchObject({"status": "packed"})
  }),

  it('order status should change from "packed" to "delivered" when calling "/orderdelivered"', async () => {

    const endpointDeliverOrder = `https://5sjj467qy9.execute-api.us-east-1.amazonaws.com/dev/orderdelivered/${orderId}`
    const apiKeyDeliverOrder = "3a82cc3c-2310-446d-ba8c-d716c3d90a27"

    await axios.post(endpointDeliverOrder, {}, {headers: {Authorization: apiKeyDeliverOrder}});
    

    await expect(
      dynamodbItem({
        tableName: 'dev-ecom-app-orders-table',
        key: {
          id: orderId,
        },
      })
    ).toExistAndMatchObject({"status": "delivered"})
  })

})