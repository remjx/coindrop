import { sesSend } from './ses-client';
import genEmailHtmlFromTemplate from './genEmailHtmlFromTemplate';
import theme from '../../components/theme';

const brandColor = theme.colors.logoPrimary;

export const sendClaimBrandVerificationConfirmation = (options) => {
  const {
    email,
    username,
    manufacturer,
  } = options;

  const fromEmail = 'admin@headphonescout.com';
  const fromName = 'headphonescout';
  const subject = 'You are verified as a brand manager';
  const actionLink = `${process.env.APP_URL}/headphones?manufacturer=${manufacturer}`;
  const mainText = `You are now authorized to add & update <strong>${manufacturer}</strong> headphones.`;
  const actionText = 'Add/Update Headphones';
  const bodyContent = `
        ${mainText}
        <!-- start button -->
            <tr>
            <td align="left" bgcolor="#ffffff">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                    <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                        <td align="center" bgcolor="${brandColor}" style="border-radius: 6px;">
                            <a href="${actionLink}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">${actionText}</a>
                        </td>
                        </tr>
                    </table>
                    </td>
                </tr>
                </table>
            </td>
            </tr>
        <!-- end button -->

        <!-- start copy -->
            <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                <p style="margin: 0;">If the button doesn't work, copy and paste the following link in your browser:</p>
                <p style="margin: 0;"><a href="${actionLink}" target="_blank">${actionLink}</a></p>
            </td>
            </tr>
        <!-- end copy -->
    `;
  const html = genEmailHtmlFromTemplate({
    username,
    title: subject,
    bodyContent,
    isOneTimeEmail: true,
  });

  const msg = {
    to: email,
    from: {
      email: fromEmail,
      name: fromName,
    },
    subject,
    text: mainText,
    html,
  };

  if (process.env.NODE_ENV === 'production') {
    sesSend(msg);
  } else {
    console.log('Not sending real email confirmation because ENV !== production but would have sent with this info:', JSON.stringify(options));
  }
};
