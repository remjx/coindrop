import { Box, Tag, TagLabel } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { paymentMethodIcons } from "../../src/paymentMethods";

const PaymentMethodTag = ({ label, iconName, iconSize, color, tagcolorScheme }) => {
    const Icon = paymentMethodIcons[iconName];
    console.log("Icon", Icon);
    return (
        <Box mx={1} my={1}>
            <Tag size="lg" colorScheme={tagcolorScheme}>
                {iconName && (<Icon verticalAlign="top" color={color} boxSize={iconSize} mr={2} />)}
                <TagLabel py={1}>{label}</TagLabel>
            </Tag>
        </Box>
    );
};

PaymentMethodTag.propTypes = {
    label: PropTypes.string.isRequired,
    iconSize: PropTypes.string,
    iconName: PropTypes.string.isRequired,
    color: PropTypes.string,
    tagcolorScheme: PropTypes.string,
};
PaymentMethodTag.defaultProps = {
    iconSize: "16px",
    tagcolorScheme: undefined,
    color: undefined,
};

export default PaymentMethodTag;
