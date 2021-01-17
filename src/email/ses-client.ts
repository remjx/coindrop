import AWS from 'aws-sdk';

const accessKeyId = process.env.AWS_IAM_ADMIN_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_IAM_ADMIN_ACCESS_KEY;

AWS.config.update({
    accessKeyId,
    secretAccessKey,
    region: 'us-east-1',
});

const ses = new AWS.SESV2({ apiVersion: '2019-09-27' });

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
        FromEmailAddress: 'Coindrop <contact@coindrop.to>',
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return ses.sendEmail(params).promise();
};
