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
    from: {
        name: string
        email: string
    }
    html: string
    subject: string
}

export const sesSend = (msg: Msg): void => {
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
        ses.sendEmail(params, (err, data): void => {
            if (err) {
                console.log('err in ses.sendEmail', err);
            }
        });
    } catch (err) {
        console.log('error in ses-client', err);
    }
};
