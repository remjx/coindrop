// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { FC } from 'react';

const PrimaryText: FC = ({ children }) => (
    <h1
        css={css`
            font-size: 14px;
            color: gray;
        `}
    >
        {children}
    </h1>
);

export default PrimaryText;
