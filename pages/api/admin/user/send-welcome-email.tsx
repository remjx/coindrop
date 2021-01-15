// This is used to generate a list of emails that can be uploaded manually to EmailOctopus before sending any manual newsletters.
import nc from 'next-connect';
import { FC } from 'react';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import requireFirebaseFunctionsToken from '../../../../server/middleware/requireFirebaseFunctionsToken';
import { sesSend } from '../../../../src/email/ses-client';
import { generateStaticHTML } from '../../../../components/emails/templates/notification';
import Paragraph from '../../../../components/emails/components/paragraph';
import { githubUrl } from '../../../../src/settings';

const sendWelcomeEmail: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { email } = req.body;
        const Body: FC = () => (
          <>
          <Paragraph>
              Coindrop&apos;s mission is to make it easy to receive tips and donations anywhere.
          </Paragraph>
          <Paragraph>
              As you begin to use Coindrop, I&apos;d love to hear your feedback. What could be improved? You can reply directly to any of our e-mail.
          </Paragraph>
          <Paragraph>
              Coindrop is 100% open-source on <a href={githubUrl} style={{color: "gray"}}>Github</a> so any contributions are open and welcome.
          </Paragraph>
          <Paragraph>
              Thank you and enjoy zero-fee tipping!
          </Paragraph>
          <Paragraph>
              - Mark Jackson, Founder of Coindrop
          </Paragraph>
          </>
      );
      const html = generateStaticHTML({
          title: "Welcome!",
          previewText: "A few things to note as you get started",
          Body,
          userEmail: email,
          emailListId: null,
      });
      await sesSend({
          to: email,
          subject: 'Welcome to Coindrop',
          html,
      });
      return res.status(200).end();
    } catch (err) {
        console.log(err);
        return res.status(500).end();
    }
};

const handler = nc()
  .use(requireFirebaseFunctionsToken)
  .post(sendWelcomeEmail);

export default handler;
