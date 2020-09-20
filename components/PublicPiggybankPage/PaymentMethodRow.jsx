import PropTypes from 'prop-types';
import { Icon } from '@chakra-ui/core';

const PaymentMethodRow = (props) => {
    const { addressField, addressValue } = props;
    // TODO: Make a test for this to ensure that if "address_" format ever changes, it doesn't impact this logic. Or set the substr length to be equal to the prefix length.
    const paymentMethod = addressField.substr(8);
    return (
        <>
            <Icon name={paymentMethod} size="32px" />
            {addressField}
            {addressValue}
        </>
    );
};

PaymentMethodRow.propTypes = {
    addressField: PropTypes.string.isRequired,
    addressValue: PropTypes.string.isRequired,
};

PaymentMethodRow.defaultProps = {

};

export default PaymentMethodRow;
