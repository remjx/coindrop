import PropTypes from 'prop-types';
import { Icon } from '@chakra-ui/core';

const PaymentMethodRow = (props) => {
    const { addressField, addressValue } = props;
    const paymentMethod = addressField.substr(8);
    console.log('paymentMethod', paymentMethod);
    return (
        <>
        <Icon name={paymentMethod} />
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
