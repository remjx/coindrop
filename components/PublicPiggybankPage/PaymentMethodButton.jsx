import PropTypes from 'prop-types';
import { Icon, Text, Flex, useTheme, PseudoBox } from '@chakra-ui/core';
import { paymentMethodNames } from '../../src/paymentMethods';

const PaymentMethodButton = (props) => {
    const theme = useTheme();
    const { paymentMethod, paymentMethodValue, isPreferred } = props;
    const accentColor = theme.colors.orange['500'];
    return (
        <PseudoBox
            as="button"
            lineHeight="1.2"
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            border={isPreferred ? "2px" : "1px"}
            rounded="2px"
            fontSize="18px"
            fontWeight="semibold"
            bg="white"
            // TODO: use user's accentColor if isPreferred
            borderColor={isPreferred ? accentColor : theme.colors.gray['300']}
            p={4}
            m={2}
            shadow="md"
            color={theme.colors.gray['800']}
            _hover={{ bg: theme.colors.gray['200'] }}
            _active={{
                bg: theme.colors.gray['300'],
                transform: "scale(0.98)",
                borderColor: theme.colors.gray['800'],
            }}
        >
            <Flex align="center">
                <Icon name={paymentMethod} size="32px" />
                <Text ml={2}>{paymentMethodNames[paymentMethod]}</Text>
            </Flex>
            {isPreferred && (
                <Text
                    fontSize="xs"
                    color={theme.colors.gray['500']}
                >
                    Preferred
                </Text>
            )}
        </PseudoBox>
    );
};

PaymentMethodButton.propTypes = {
    paymentMethod: PropTypes.string.isRequired,
    paymentMethodValue: PropTypes.string.isRequired,
    isPreferred: PropTypes.bool,
};

PaymentMethodButton.defaultProps = {
    isPreferred: false,
};

export default PaymentMethodButton;
