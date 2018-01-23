'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports.handler = (event, context, callback) => {
  const data = event;
  const id = uuid.v1();
  console.log(data);


  if (data.text && typeof data.text !== "string") {
    console.error("Validation Failed!");
    callback(new Error("Body does not contain a text property!"));
    return
  };

  const params = {
    TableName: "Table",
    Item: {
      _id: id,
      text: data.text
    },
  };

  const putCallback = (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error("Could not save!"));
      return;
    }
    const response = {
      statusCode: 200,
      body: {
        _id: id,
        res: data.text
      }
    };
    callback(null, response);
  };

  dynamo.put(params, putCallback);
};
