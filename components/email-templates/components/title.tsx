// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { FC } from 'react';

const Title: FC = ({ children }) => (
    <h1
        css={css`
            font-family: "'Fira Sans', 'Segoe UI', Segoe-UI, Helvetica, Arial, sans-serif"
        `}
    >
        {children}
    </h1>
);

export default Title;
