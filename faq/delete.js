'use strict'

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => {
    const data = event;
    console.log(data);


    if (data.text && typeof data.text !== "string") {
        console.error("Validation Failed!");
        callback(new Error("Body does not contain a text property!"));
        return
    };

    const params = {
        TableName: "Table",
        Item: {
            _id: data.id
        }
    };

    const deleteCallback = (error, result) => {
        if (error) {
          console.error(error);
          callback(new Error("Could not save!"));
          return;
        }
        console.log(result);
        callback(null, "Item is deleted");
      };

    dynamo.delete(params, deleteCallback);
};