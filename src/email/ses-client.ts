import AWS from 'aws-sdk';

const accessKeyId = process.env.AWS_IAM_ADMIN_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_IAM_ADMIN_ACCESS_KEY;

AWS.config.update({
    accessKeyId,
    secretAccessKey,
    region: 'us-east-1',
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

type Msg = {
    to: string
    html: string
    subject: string
}

export const sesSend = (msg: Msg): void => {
    try {
        const { to, html, subject } = msg;
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
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: subject,
                },
            },
            Source: 'Coindrop <contact@coindrop.to>',
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ses.sendEmail(params, (err, data): void => {
            if (err) {
                console.log('err in ses.sendEmail', err);
            }
        });
    } catch (err) {
        console.log('error in ses-client', err);
    }
};
