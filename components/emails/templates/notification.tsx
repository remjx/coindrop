/* eslint-disable arrow-body-style */
import { FC } from 'react';
import ReactDOMServer from "react-dom/server";
import Footer from '../components/footer';
import BaseEmailTemplate from './base';
import Title from '../components/title';

type Data = {
    title: string
    previewText: string
    Body: FC
}

type Props = Omit<Data, "Body">;

const NotificationEmailContent: FC<Props> = ({
    title,
    previewText,
    children,
}) => {
    return (
        <BaseEmailTemplate
            previewText={previewText}
        >
            <Title>
                {title}
            </Title>
            {children}
            <Footer />
        </BaseEmailTemplate>
    );
};

export function generateStaticHTML({ title, previewText, Body }: Data): string {
    const html = ReactDOMServer.renderToStaticMarkup(
        <NotificationEmailContent
            title={title}
            previewText={previewText}
        >
            <Body />
        </NotificationEmailContent>,
    );
    return `
        <!DOCTYPE html>
        ${html}
    `;
}
