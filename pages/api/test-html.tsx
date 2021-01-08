// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import ReactDOMServer from "react-dom/server";
import { renderStylesToString } from '@emotion/server'
import NotificationEmailTemplate from '../../components/email-templates/notification-email-template';
import { sesSend } from '../../src/email/ses-client';

function render() {
    const html = renderStylesToString(ReactDOMServer.renderToStaticMarkup(
        <NotificationEmailTemplate
            title="You created a new Coindrop"
        />,
    ));
    return `
        <!DOCTYPE html>
        ${html}
    `;
}

const testHtml: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const html = render();
        // sesSend({
        //     to: 'markjackson02@gmail.com',
        //     subject: 'Test e-mail',
        //     html,
        //     text: "This is a test e-mail preview text",
        // });
        // res.status(200).send('email sent');
        res.status(200).send(html);
    } catch (err) {
        console.log(err);
        res.status(500).end();
    }
};

export default testHtml;
