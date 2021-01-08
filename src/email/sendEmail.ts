import { sesSend } from './ses-client';

type Options = {
  to: string
  fromEmail: string
  fromName: string
  subject: string
  html: string
}

export const sendEmail = (options: Options): void => {
    const { to, fromEmail, fromName, subject, html } = options;
    if (process.env.NODE_ENV === 'production') {
        sesSend({
          to,
          from: {
            email: fromEmail,
            name: fromName,
          },
          subject,
          html,
        });
    } else {
        console.warn('Not sending email via SES because ENV !== production');
    }
};
