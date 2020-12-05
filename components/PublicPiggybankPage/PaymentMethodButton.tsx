import { FunctionComponent } from 'react';
import { useDisclosure, Text, Flex, useTheme, Box, useColorModeValue } from '@chakra-ui/react';
import { paymentMethodNames, paymentMethodIcons } from '../../src/paymentMethods';
import PaymentMethodButtonModal from './PaymentMethodButtonModal';

type Props = {
    paymentMethod: string
    paymentMethodValue: string
    isPreferred: boolean
    accentColor: string
}

const PaymentMethodButton: FunctionComponent<Props> = ({
    paymentMethod,
    paymentMethodValue,
    isPreferred,
    accentColor,
}) => {
    const theme = useTheme();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const paymentMethodDisplayName = paymentMethodNames[paymentMethod];
    const Icon = paymentMethodIcons[paymentMethod];
    const textColor = useColorModeValue("gray.800", "white");
    return (
        <>
        <PaymentMethodButtonModal
            isOpen={isOpen}
            onClose={onClose}
            paymentMethod={paymentMethod}
            paymentMethodDisplayName={paymentMethodDisplayName}
            paymentMethodValue={paymentMethodValue}
        />
        <Box
            id={`payment-method-button-${paymentMethod}`}
            as="button"
            lineHeight="1.2"
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            borderWidth={isPreferred ? "2px" : "1px"}
            rounded="6px"
            fontSize="18px"
            fontWeight="semibold"
            bg={useColorModeValue("gray.100", "gray.800")}
            borderColor={isPreferred ? theme.colors[accentColor]['500'] : theme.colors.gray['300']}
            p={4}
            m={2}
            shadow="md"
            color={textColor}
            _hover={{
                bg: useColorModeValue("gray.200", "gray.500"),
                transform: "scale(0.98)",
            }}
            _active={{
                bg: theme.colors.gray['300'],
                transform: "scale(0.96)",
                // TODO: This is somehow getting a black border, should be accentColor.
            }}
            onClick={onOpen}
        >
            <Flex align="center">
                <Icon boxSize="32px" />
                <Text ml={2}>{paymentMethodDisplayName}</Text>
            </Flex>
            {isPreferred && (
                <Text
                    fontSize="xs"
                    color={textColor}
                >
                    Preferred
                </Text>
            )}
        </Box>
        </>
    );
};

export default PaymentMethodButton;
