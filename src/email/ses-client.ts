import * as AWS from '@aws-sdk/client-sesv2';

const accessKeyId = process.env.AWS_IAM_ADMIN_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_IAM_ADMIN_ACCESS_KEY;

const ses = new AWS.SESv2({
    region: 'us-east-1',
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});

type Msg = {
    to: string
    subject: string
    html: string
}

export const sesSend = (msg: Msg): Promise<any> => {
    const { to, subject, html } = msg;
    const params = {
        Content: {
            Simple: {
                Body: {
                    Html: {
                        Data: html,
                    },
                },
                Subject: {
                    Data: subject,
                },
            },
        },
        Destination: {
            ToAddresses: [to],
        },
        FromEmailAddress: 'Coindrop <coindrop.to@gmail.com>',
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return ses.sendEmail(params);
};
