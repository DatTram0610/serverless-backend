'use strict'

const AWS = require('aws-sdk');

let ses = new AWS.SES();


module.exports.handler = (event, context, callback) => {
    console.log("Hello event", event);
    let toAddresses = event.toAddresses;
    console.log("Hello toAddresses", toAddresses);
    let textData = event.textData;
    console.log("textData");
    console.log("Hello textData", textData);
    let subjectData = event.subjectData;
    let sourceEmail = event.sourceEmail;



    let emailParams = {
        Destination: {
            ToAddresses: [toAddresses]
        },
        Message: {
            Body: {
                Text: {
                    Data: textData
                }
            },
            Subject: {
                Data: subjectData
            }
        },
        Source: sourceEmail
    };

    console.log(emailParams);
    
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
