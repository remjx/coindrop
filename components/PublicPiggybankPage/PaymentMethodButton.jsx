import PropTypes from 'prop-types';
import { Icon, Text, Flex, useTheme, PseudoBox } from '@chakra-ui/core';
import { paymentMethodNames } from '../../src/paymentMethods';

const PaymentMethodButton = (props) => {
    const theme = useTheme();
    const { addressField, addressValue } = props;
    // TODO: Make a test for this to ensure that if "address_" format ever changes, it doesn't impact this logic. Or set the substr length to be equal to the prefix length.
    const paymentMethod = addressField.substr(8);
    return (
        <PseudoBox
            as="button"
            lineHeight="1.2"
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            border="1px"
            rounded="2px"
            fontSize="18px"
            fontWeight="semibold"
            bg={theme.colors.gray['100']}
            borderColor={theme.colors.gray['300']}
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
        </PseudoBox>
    );
};

PaymentMethodButton.propTypes = {
    addressField: PropTypes.string.isRequired,
    addressValue: PropTypes.string.isRequired,
};

PaymentMethodButton.defaultProps = {

};

export default PaymentMethodButton;
