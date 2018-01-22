'use strict'

const AWS = require('aws-sdk');

let ses = new AWS.SES();


module.exports.handler = (event, context, callback) => {
    console.log("Hello");
    let emailParams = {
        Destination: {
            BccAddresses: ["dattram0610@gmail.com"],
            CcAddresses: ["dattram0610@gmail.com"],
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
    console.log("Hello 1");
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
            message: "Message sent!"
        })
    };
    console.log("Hello 2");

    ses.sendEmail(emailParams, (error, data) => {
        console.log("Hello 3");
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
