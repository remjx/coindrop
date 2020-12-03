/* eslint-disable arrow-body-style */
import { FunctionComponent } from 'react';
import { FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';
import { Flex, Link, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import {
    githubUrl,
    twitterUrl,
    instagramUrl,
} from '../../src/settings';
import styles from './SocialLinks.module.scss';

type SocialLinkProps = {
    icon: IconType
    href: string
}

const SocialLink: FunctionComponent<SocialLinkProps> = ({ icon, href }) => (
    <Link
        href={href}
        ml={3}
        isExternal
        className={styles.link}
    >
        <Icon
            as={icon}
            boxSize="1.5rem"
        />
    </Link>
);

export const SocialLinks: FunctionComponent = () => {
    return (
        <Flex align="center" wrap="wrap">
            <SocialLink icon={FaTwitter} href={twitterUrl} />
            <SocialLink icon={FaInstagram} href={instagramUrl} />
            <SocialLink icon={FaGithub} href={githubUrl} />
        </Flex>
    );
};
