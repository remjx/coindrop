import { FC } from 'react';
import { Heading } from '@chakra-ui/react';
import styles from './HeadingTextPrimary.module.scss';

interface Props {
    textPreUnderline: string
    textUnderline: string
    textPostUnderline: string
}

export const HeadingTextPrimary: FC<Props> = ({
    textPreUnderline = "The ",
    textUnderline = "easy",
    textPostUnderline = " way to get paid",
}) => (
    <Heading
        textAlign="center"
        as="h1"
        size="2xl"
        fontFamily="'Fira Sans'; Segoe-UI; sans-serif"
        fontWeight="600"
    >
        {textPreUnderline}
        <span
            className={styles.underline}
        >
            {textUnderline}
        </span>
        {textPostUnderline}
    </Heading>
);
