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
        style={{
            marginRight: "2px",
        }}
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
