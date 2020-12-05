import { FunctionComponent, useState } from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Link as ChakraLink, Button, Flex, useDisclosure } from '@chakra-ui/react';
import EditPiggybankModal from '../EditPiggybankModal/EditPiggybankModal';
import ShareButtonModal from './ShareButtonModal/ShareButtonModal';
import { AdditionalValidationProvider } from '../EditPiggybankModal/AdditionalValidationContext';

/* eslint-disable react/jsx-props-no-spreading */
const LinkButton = ({ href, children, ...rest }) => (
    <NextLink href={href} passHref>
        <ChakraLink style={{textDecoration: "none"}}>
            <Button {...rest}>
                {children}
            </Button>
        </ChakraLink>
    </NextLink>
);
LinkButton.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
};
/* eslint-enable react/jsx-props-no-spreading */

type Props = {
    editButtonOptions: {
        text: string
        color: string
        icon: JSX.Element
    },
    initialSetupComplete: boolean
}

const ManagePiggybankBar: FunctionComponent<Props> = ({ editButtonOptions, initialSetupComplete }) => {
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
    const [isDashboardLoading, setIsDashboardLoading] = useState(false);
    return (
        <Box>
            {isEditOpen && ( // this conditional is needed to force remount of form so latest values are used
                <AdditionalValidationProvider>
                    <EditPiggybankModal
                        isOpen={isEditOpen}
                        onClose={onEditClose}
                    />
                </AdditionalValidationProvider>
            )}
            <Flex
                justify={["center", null, "space-between"]}
                mt={4}
                mx={6}
                wrap="wrap"
            >
                <Box
                    onClick={() => setIsDashboardLoading(true)}
                    mt={2}
                >
                    <LinkButton
                        href="/dashboard"
                        leftIcon={<ArrowBackIcon />}
                        isLoading={isDashboardLoading}
                        loadingText="Loading"
                    >
                        Dashboard
                    </LinkButton>
                </Box>
                <Box mx={3} mt={2}>
                    <Button
                        id="configure-coindrop-button"
                        leftIcon={editButtonOptions.icon}
                        onClick={onEditOpen}
                        colorScheme={editButtonOptions.color}
                        isDisabled={isEditOpen}
                    >
                        {editButtonOptions.text}
                    </Button>
                </Box>
                <Box
                    align="center"
                    mt={2}
                >
                    <ShareButtonModal
                        buttonColor={initialSetupComplete ? 'green' : undefined}
                    />
                </Box>
            </Flex>
        </Box>
    );
};

export default ManagePiggybankBar;
