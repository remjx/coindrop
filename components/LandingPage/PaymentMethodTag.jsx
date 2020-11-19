import { Box, Tag, TagLabel } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { paymentMethodIcons } from "../../src/paymentMethods";

const PaymentMethodTag = ({ label, iconName, iconSize, color, tagColorScheme }) => {
    const Icon = paymentMethodIcons[iconName];
    return (
        <Box mx={1} my={1}>
            <Tag size="lg" colorScheme={tagColorScheme}>
                {iconName && (<Icon verticalAlign="top" color={color} boxSize={iconSize} mr={2} />)}
                <TagLabel py={1}>{label}</TagLabel>
            </Tag>
        </Box>
    );
};

PaymentMethodTag.propTypes = {
    label: PropTypes.string.isRequired,
    iconSize: PropTypes.string,
    iconName: PropTypes.string,
    color: PropTypes.string,
    tagColorScheme: PropTypes.string,
};
PaymentMethodTag.defaultProps = {
    iconSize: "16px",
    tagColorScheme: undefined,
    color: undefined,
    iconName: undefined,
};

export default PaymentMethodTag;
