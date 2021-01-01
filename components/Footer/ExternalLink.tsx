import { Link } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { FooterText } from './FooterText';

type Props = {
    href: string
    text: string
    openInNewTab?: boolean
}
export const ExternalLink: FunctionComponent<Props> = ({ href, text, openInNewTab = true }) => (
    <Link
        href={href}
        isExternal={openInNewTab}
    >
        <FooterText>
            {text}
        </FooterText>
    </Link>
);
