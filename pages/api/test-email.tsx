
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { FC } from 'react';
import { sesSend } from '../../src/email/ses-client';
import { generateStaticHTML } from '../../components/emails/templates/notification';

const testHtml: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const Body: FC = () => (<div>hiiiii</div>);
        const html = generateStaticHTML({
            title: "Hello test",
            previewText: "Preview text...",
            Body,
            emailListId: "test-list",
            userEmail: 'mark@test.com',
        });
        // sesSend({
        //     to: 'markjackson02@gmail.com',
        //     subject: 'Test e-mail2',
        //     html,
        // });
        res.status(200).send(html);
    } catch (err) {
        console.log(err);
        res.status(500).end();
    }
};

export default testHtml;
