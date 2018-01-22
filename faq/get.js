'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => {
  var params = {
    TableName: "Table"
  };

  const getCallback = (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error("Could not scan!"));
      return;
    }
    console.log(result)
    const response = {
      statusCode: 200,
      body: JSON.stringify(result),
    };
    callback(null, response);
  };

  dynamo.scan(params, getCallback);
};
