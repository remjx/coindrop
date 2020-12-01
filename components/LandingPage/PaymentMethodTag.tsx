import { Box, Tag, TagLabel } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { paymentMethodIcons } from "../../src/paymentMethods";

type Props = {
    label: string
    iconName?: string
    iconSize?: string
    color?: string
    tagColorScheme?: string
}

const PaymentMethodTag: FunctionComponent<Props> = ({ label, iconName, iconSize = "16px", color, tagColorScheme }) => {
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

export default PaymentMethodTag;
