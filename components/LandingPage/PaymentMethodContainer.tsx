import { FC } from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { PaymentMethodTags } from './PaymentMethodTags';
import { Category } from '../../src/paymentMethods';

type PaymentMethodContainerProps = {
    title: string
    paymentMethodCategory: Category
}

export const PaymentMethodContainer: FC<PaymentMethodContainerProps> = ({ title, paymentMethodCategory }) => (
    <Flex
        flex={[null, "1 0 100%", "1 0 50%", "1 0 33.33%"]}
        direction="column"
        mt={6}
    >
        <Heading as="h3" size="md" textAlign="center">
            {title}
        </Heading>
        <Flex wrap="wrap" justify="center" mt={3}>
            <PaymentMethodTags category={paymentMethodCategory} />
        </Flex>
    </Flex>
);
