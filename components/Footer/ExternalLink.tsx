import { Link } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { FooterText } from './FooterText';

type Props = {
    href: string
    text: string
}
export const ExternalLink: FunctionComponent<Props> = ({ href, text }) => (
    <Link
        href={href}
        isExternal
        mr={3}
    >
        <FooterText>
            {text}
        </FooterText>
    </Link>
);
