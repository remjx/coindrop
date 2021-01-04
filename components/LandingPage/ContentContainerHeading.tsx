import { FC } from 'react';
import { Heading, HeadingProps } from '@chakra-ui/react';
import styles from './ContentContainerHeading.module.scss';

type ContentContainerHeadingProps = {
    headingProps?: HeadingProps
    withThroughline?: boolean
}

export const ContentContainerHeading: FC<ContentContainerHeadingProps> = ({ headingProps, withThroughline = false, children }) => (
    <Heading
        as="h2"
        size="xl"
        textAlign="center"
        mb={2}
        fontFamily="'Fira Sans'; Segoe-UI; sans-serif"
        fontWeight="600"
        maxW={['100%', '90%', '85%', '80%']}
        mx="auto"
        {...headingProps}
        className={withThroughline ? styles.throughline : undefined}
    >
        <span>
            {children}
        </span>
    </Heading>
);
