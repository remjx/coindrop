import nc from 'next-connect';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { FC } from 'react';
import { sesSend } from '../../../src/email/ses-client';
import { generateStaticHTML } from '../../../components/emails/templates/notification';
import requireFirebaseToken from '../../../server/middleware/requireFirebaseToken';
import Paragraph from '../../../components/emails/components/paragraph';
import { githubUrl } from '../../../src/settings';

const sendWelcomeEmail: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    let userEmailAddress = req.headers.email;
    userEmailAddress = Array.isArray(userEmailAddress) ? userEmailAddress[0] : userEmailAddress;
    try {
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
            userEmail: userEmailAddress,
            emailListId: null,
        });
        await sesSend({
            to: userEmailAddress,
            subject: 'Welcome to Coindrop',
            html,
        });
        res.status(200).send(html);
    } catch (err) {
        console.log(err);
        res.status(500).end();
    }
};

const handler = nc()
  .use(requireFirebaseToken)
  .get(sendWelcomeEmail);

export default handler;
