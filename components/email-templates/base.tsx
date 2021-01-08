/* eslint-disable arrow-body-style */
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { FC } from 'react';
import Logo from './components/logo';

const BaseEmailTemplate: FC = ({ children }) => {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <title>Coindrop</title>
                <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@600&display=swap" rel="stylesheet" />
            </head>
            <body
                css={css`
                    background-color: #f6f6f6;
                    margin: 0;
                    font-family: "Segoe UI", Helvetica, Arial, sans-serif;
                `}
            >
                <div
                    id="content-container"
                    css={css`
                        max-width: 600px;
                        margin: auto;
                        padding: 20px;
                        background-color: white;
                    `}
                >
                    <Logo />
                    {children}
                </div>
            </body>
        </html>
    );
};

export default BaseEmailTemplate;
