import { FC } from 'react';
import { Heading } from '@chakra-ui/react';

type Props = {
    title: string
}
const Title: FC<Props> = ({ title }) => (
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
