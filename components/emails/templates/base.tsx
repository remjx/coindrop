/* eslint-disable arrow-body-style */
import { FC } from 'react';
import Logo from '../components/logo';

type Props = {
    previewText: string | null
}

const BaseEmailTemplate: FC<Props & { children: React.ReactNode }> = ({ children, previewText }) => {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <title>Coindrop</title>
                <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@600&display=swap" rel="stylesheet" />
            </head>
            <body
                style={{
                    backgroundColor: "#f6f6f6",
                    margin: 0,
                    fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
                }}
            >
                {previewText && (
                    // Shows on same line as Subject in Gmail
                    <>
                        <div
                            style={{display: "none", maxHeight: "0px", overflow: "hidden"}}
                        >
                            {previewText}
                        </div>
                        <div
                            style={{display: "none", maxHeight: "0px", overflow: "hidden"}}
                        >
                            &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
                        </div>
                    </>
                )}
                <div
                    id="content-container"
                    style={{
                        maxWidth: "600px",
                        margin: "20px auto auto auto",
                        padding: "20px",
                        backgroundColor: "white",
                    }}
                >
                    <Logo />
                    {children}
                </div>
            </body>
        </html>
    );
};

export default BaseEmailTemplate;
