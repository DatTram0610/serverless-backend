'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => {
  const data = event;
  const timestamp = new Date().getTime();
  console.log(data);


  if (data.text && typeof data.text !== "string") {
    console.error("Validation Failed!");
    callback(new Error("Body does not contain a text property!"));
    return
  };

  const params = {
    TableName: "Table",
    Key: {
      id: data.id
    },
    ExpressionAttributeNames: {
      '#text': 'text',
    },
    ExpressionAttributeValues: {
      ':text': data.text,
      ':updatedAt': timestamp
    },
    UpdateExpression: 'SET #text = :text, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  const updateCallback = (error, result) => {
    if(error) {
      console.error(error);
      callback(new Error("Could not update!"));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes)
    }
    callback(null, response);
  }
  dynamo.update(params, updateCallback);
};
