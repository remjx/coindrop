import { FC } from 'react';
import { Heading } from '@chakra-ui/react';

const Title: FC<{title: string}> = ({ title }) => (
    <Heading
        textAlign="center"
        fontSize="1.75rem"
        fontFamily="'Fira Sans'; Segoe-UI; sans-serif"
        fontWeight="600"
        mt={4}
    >
        {title}
    </Heading>
);

export default Title;
