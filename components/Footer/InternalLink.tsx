import Link from 'next/link';
import { Box } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { FooterText } from './FooterText';
import styles from './InternalLink.module.scss';

type Props = {
    href: string
    text: string
    prefetch?: boolean
}
export const InternalLink: FunctionComponent<Props> = ({ href, text, prefetch = false }) => (
    <Box>
        <Link
            href={href}
            prefetch={prefetch}
            className={styles.link}
        >
            <FooterText>
                {text}
            </FooterText>
        </Link>
    </Box>
);
