import { Box, Tag, TagLabel, Icon } from '@chakra-ui/core';
import PropTypes from 'prop-types';

const PaymentMethodTag = ({ label, iconName, iconSize, color, tagVariantColor }) => (
    <Box mx={1} my={1}>
        <Tag size="lg" variantColor={tagVariantColor}>
            <Icon verticalAlign="top" name={iconName} color={color} size={iconSize} mr={2} />
            <TagLabel py={1}>{label}</TagLabel>
        </Tag>
    </Box>
);

PaymentMethodTag.propTypes = {
    label: PropTypes.string.isRequired,
    iconSize: PropTypes.string,
    iconName: PropTypes.string.isRequired,
    color: PropTypes.string,
    tagVariantColor: PropTypes.string,
};
PaymentMethodTag.defaultProps = {
    iconSize: "16px",
    tagVariantColor: undefined,
    color: undefined,
};

export default PaymentMethodTag;
