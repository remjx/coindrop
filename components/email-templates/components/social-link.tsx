// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { FC } from 'react';
import { baseUrl } from '../../../src/settings';

type Props = {
    href: string
    title: string
    alt: string
    srcPath: string
}

const SocialLink: FC<Props> = ({
    href,
    title,
    alt,
    srcPath,
}) => (
    <a
        target="_blank"
        rel="noreferrer"
        href={href}
        css={css`
            margin-right: 2px;
        `}
    >
        <img
            title={title}
            src={`${baseUrl}${srcPath}`}
            alt={alt}
            width="32"
        />
    </a>
);

export default SocialLink;
