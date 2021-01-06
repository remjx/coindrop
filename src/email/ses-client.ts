const AWS = require('aws-sdk');
const { serializeError } = require('serialize-error');
const { logger } = require('../../logger');

const accessKeyId = process.env.AWS_IAM_USER_HEADPHONESCOUT_ADMIN_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_IAM_USER_HEADPHONESCOUT_ADMIN_ACCESS_KEY;

AWS.config.update({
    accessKeyId,
    secretAccessKey,
    region: 'us-east-1',
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

export const sesSend = (msg: any) => {
    try {
        const { to, from, html, subject } = msg;
        const fromAddr = `${from.name} <${from.email}>`;
        const params = {
            Destination: {
                ToAddresses: [to],
            },
            Message: {
                Body: {
                    Html: {
                        Charset: 'UTF-8',
                        Data: html,
                    },
                    /* replace Html attribute with the following if you want to send plain text emails.
                    Text: {
                        Charset: "UTF-8",
                        Data: message
                    }
                    */
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: subject,
                },
            },
            Source: fromAddr,
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ses.sendEmail(params, (err: any, data: any): void => {
            if (err) {
                logger.log({
                    level: 'error',
                    message: 'Error sending email ses.sendEmail()',
                    meta: {
                        error: serializeError(err),
                        msg,
                    },
                });
            }
        });
    } catch (err) {
        logger.log({
            level: 'error',
            message: 'Error sending email sesSend()',
            meta: {
                error: serializeError(err),
                msg,
            },
        });
    }
};
