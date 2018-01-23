'use strict'

const AWS = require('aws-sdk');

let ses = new AWS.SES();


module.exports.handler = (event, context, callback) => {
    let emailParams = {
        Destination: {
            ToAddresses: ["dattram0610@gmail.com"]
        },
        Message: {
            Body: {
                Text: {
                    Data: "This is a message test"
                }
            },
            Subject: {
                Data: "This is a subject data test"
            }
        },
        Source: "davidtram0610@gmail.com"
    };
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
            message: "Message sent!"
        })
    };

    ses.sendEmail(emailParams, (error, data) => {
        if (error) {
            console.log("Error", error.stack);
            callback(error);
        } else {
            console.log("SES succeeded");
            console.log(data)
            callback(null, response)
        }
    });
}
