const { sesSend } = require('./ses-client');
const { transport } = require('./nodemailer');

export const sendEmail = ({ to, fromEmail, fromName, subject, text, html }) => {
    if (true) {
        sesSend({
          to,
          from: {
            email: fromEmail,
            name: fromName,
          },
          subject,
          text,
          html,
        });
    } else {
        console.warn('Not sending email via SES because ENV !== production');
        transport.sendMail({
          from: fromEmail,
          to,
          subject,
          text,
          html,
        });
    }
};
