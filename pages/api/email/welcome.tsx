import nc from 'next-connect';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { FC } from 'react';
import { sesSend } from '../../../src/email/ses-client';
import { generateStaticHTML } from '../../../components/emails/templates/notification';
import requireFirebaseToken from '../../../server/middleware/requireFirebaseToken';
import Paragraph from '../../../components/emails/components/paragraph';

const sendWelcomeEmail: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    let userEmailAddress = req.headers.email;
    userEmailAddress = Array.isArray(userEmailAddress) ? userEmailAddress[0] : userEmailAddress;
    try {
        const Body: FC = () => (
            <>
            <Paragraph>
                How is your experience with Coindrop?
            </Paragraph>
            <Paragraph>
                Coindrop&apos;s mission is to deliver the best donation and tipping experience on the internet.
            </Paragraph>
            <Paragraph>
                Coindrop is 100% open-source so any contributions to improve the project are open and welcome!
            </Paragraph>
            <Paragraph>
                Happy tipping,
                <br />
                <a href="https://remjx.com">Mark</a>
                {' from Coindrop'}
            </Paragraph>
            </>
        );
        const html = generateStaticHTML({
            title: " you created your first Coindrop?",
            previewText: "The easy way to accept donations and tips",
            Body,
        });
        sesSend({
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
