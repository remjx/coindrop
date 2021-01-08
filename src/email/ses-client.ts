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
    text: string
}

export const sesSend = (msg: Msg): void => {
    try {
        const { to, subject, html, text } = msg;
        const params = {
            Content: {
                Simple: {
                    Body: {
                        Html: {
                            Data: html,
                        },
                        Text: {
                            Data: text,
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
        ses.sendEmail(params, (err, data): void => {
            if (err) {
                console.log('err in ses.sendEmail', err);
            }
        });
    } catch (err) {
        console.log('error in ses-client', err);
    }
};
